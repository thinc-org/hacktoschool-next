import { GetServerSideProps } from "next";
import Router from "next/router";
import { useEffect, useState } from "react";
import { Headerr } from "../../component/headerr";
import prisma from "../../lib/prisma";

const CourseHome: React.FC = ({ course: { id: courseId, title, description }, registered_students }) => {
    const [role, setRole] = useState('')
    const [enrolled, setEnrolled] = useState(false)
    const [loading, setLoading] = useState(true)

    
    console.log(registered_students.values);

    useEffect(() => {


        // check if the student has enroll in the course or not
        const fetchCheckEnrolled = async () => {
            const studentId = parseInt(localStorage.getItem('id'));

            const body = {
                studentId: studentId,
                courseId: courseId
            };
            try {
                console.log('checking enroll');
                const response = await fetch(`/api/enroll/check_is_enroll`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
                });
                console.log("done check");
                const json = await response.json();
                console.log(json.data);
                setEnrolled(json.data);
                // console.log(loading);
            } catch (error) {
                // setError(error);
            } finally {
                setLoading(false);
                // console.log(loading);
            }

        };
        setRole(localStorage.getItem('role'));
        if (localStorage.getItem('role') === 'student') {
            fetchCheckEnrolled();
        }
    }, []);

    console.log(loading);

    const enrollNonUserHandler = () => {
        Router.push('/signup');
    }

    const enrollHandler = async () => {
        const studentId = parseInt(localStorage.getItem('id'));
        console.log(typeof courseId);
        console.log(typeof studentId);
        const body = {
            studentId: studentId,
            courseId: courseId
        };
        try {
            const response = await fetch(`/api/enroll`, {   // careful to use `/api/enroll` and not `api/enroll`
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            const json = await response.json();
            console.log(json);
            if (response.status == 200) {
                setEnrolled(true);
            }
            // console.log(loading);
        } catch (error) {
            // setError(error);
        } finally {
            // setLoading(false);
            // console.log(loading);
        }
    }

    const leaveHandler = async () => {
        const studentId = parseInt(localStorage.getItem('id'));
        console.log(typeof courseId);
        console.log(typeof studentId);
        const body = {
            studentId: studentId,
            courseId: courseId
        };
        try {
            const response = await fetch(`/api/enroll`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            const json = await response.json();
            console.log(json);
            Router.push('/student/Dashboard');
            // console.log(loading);
        } catch (error) {
            // setError(error);
        } finally {
            // setLoading(false);
            // console.log(loading);
        }
    }

    const deleteHandler = async () => {
        console.log("deleting");
        try {
            const response = await fetch(`/api/course/${courseId}`, {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
            });
            const json = await response.json();
            console.log(json);
            Router.push('/instructor/main');
            // console.log(loading);
        } catch (error) {
            // setError(error);
        } finally {
            // setLoading(false);
            // console.log(loading);
        }
    }



    if (role === 'student') {
        return (
            <>
                <Headerr />
                <h1>{title}</h1>
                <small>Description: {description}</small>


                {loading ? (<div>Loading ...</div>) : (
                    <div>
                        {enrolled ? (
                            <button className="bg-red-500 text-white py-2 px-4 rounded" onClick={() => leaveHandler()}>leave</button>
                        ) : (
                            <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={() => enrollHandler()}>enroll</button>
                        )}
                    </div>
                )}
            </>
        )
    } else if (role === 'instructor') {
        return (
            <>
                <Headerr />
                <button className="bg-red-500 text-white py-2 px-4 rounded" onClick={() => deleteHandler()}>delete</button>

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

    } else {
        return (
            <>
                <Headerr />

                <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={() => enrollNonUserHandler()}>enroll (will redirect you to sign in)</button>

                <h1>{title}</h1>
                <small>Description: {description}</small>
            </>

        )
    }
}


export const getServerSideProps: GetServerSideProps = async (context) => {
    const courseId = Number(Array.isArray(context.params.id) ? context.params.id[0] : context.params.id)
    const course = await prisma.course.findUnique({
        where: { id: courseId },
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

    console.log("in heeeeeeer")
    console.log(students)

    return { props: { course: { ...JSON.parse(JSON.stringify(course)) }, registered_students: students } }
}

export default CourseHome;