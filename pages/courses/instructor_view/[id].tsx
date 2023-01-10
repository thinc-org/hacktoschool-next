import { GetServerSideProps } from "next";
import Router from "next/router";
import { useEffect, useState } from "react";
import { Headerr } from "../../../component/headerr";
import prisma from "../../../lib/prisma";

const CourseMenu: React.FC = ({ course: { id: courseId, title, description, instructor_name }, registered_students }) => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        //for new features
    }, []);

    const deleteHandler = async () => {
        try {
            const response = await fetch(`/api/course/${courseId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });
            const json = await response.json();
            console.log(json);
            Router.push('/instructor/main');
        } catch (error) {
        } finally {

        }
    }

    const Mainbody = () => {
        return (
            <>
                <button className="bg-red-500 text-white py-2 px-4 rounded" onClick={() => deleteHandler()}>Delete</button>

                <h1>{title}</h1>
                <small>Description: {description}</small>

                <div>
                    <p>Registered Students</p>
                    {
                        registered_students.length ?
                            (registered_students.map(student => (
                                <div key={student.id}>
                                    <h2>Name: {student.name}</h2>
                                    <small>Email: {student.email}</small>
                                </div>
                            ))) :
                            <h2>no registered students</h2>
                    }
                </div>

            </>
        )

    }

    return (<>

        <Headerr />
        <div className="pt-10 px-48">
            <h1 style={{color: "red"}}>FOR DEBUGGING : THIS PAGE IS FOR INSTRUCTOR VIEW OF COURSE MENU</h1>
            <Mainbody />
        </div>
    </>
    )
}

// this function will check for 
// course details, instructor name, lists of registered students
export const getServerSideProps: GetServerSideProps = async (context) => {
    const courseId = Number(Array.isArray(context.params.id) ? context.params.id[0] : context.params.id)
    const course = await prisma.course.findUnique({
        where: { id: courseId },
        include: { instructor: true },
    })

    const enrolls = await prisma.enroll.findMany({
        where: {
            courseId: courseId,
        },
    });
    const studentIdArray = enrolls.map((e) => e.studentId);

    const students = await prisma.student.findMany({
        where: {
            id: {
                in: studentIdArray
            }
        },

        select: {
            id: true,
            email: true,
            name: true,
        },
    });

    return { props: { course: { ...JSON.parse(JSON.stringify(course)), instructor_name: course.instructor.name }, registered_students: students } }
}

export default CourseMenu;