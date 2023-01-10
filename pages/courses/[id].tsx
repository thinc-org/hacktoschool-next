import { GetServerSideProps } from "next";
import Router from "next/router";
import { useEffect, useState } from "react";
import { Headerr } from "../../component/headerr";
import prisma from "../../lib/prisma";

const CourseDescription: React.FC = ({ course: { id: courseId, title, description, instructor_name }, registered_students }) => {
    const [role, setRole] = useState('')
    const [enrolled, setEnrolled] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
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
                const json = await response.json();
                setEnrolled(json.data);

                console.log("in use effect na", json.data);
            } catch (error) {
                // setError(error);
            } finally {
                setLoading(false);
                // console.log(loading);
            }

        };
        setRole(localStorage.getItem('role'));

        // check if the student has enrolled in the course or not
        if (localStorage.getItem('role') === 'student') {
            fetchCheckEnrolled();
        }
    }, []);


    // redirecting non-user to the main page
    const enrollNonUserHandler = () => {
        Router.push('/');
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
                Router.push(`student_view/${courseId}`)
            }
            // console.log(loading);
        } catch (error) {
            // setError(error);
        } finally {
            // setLoading(false);
            // console.log(loading);
        }
    }


    const Mainbody = () => {
        if (role === 'student') {
            return (
                <>
                    <h1>{title}</h1>
                    <small>Description: {description}</small>
                    <p>Instructor: {instructor_name}</p>

                    {loading ? (<div>Loading ...</div>) : (
                        <div>
                            {enrolled ? (
                                <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={() => Router.push(`student_view/${courseId}`)}>Continue Learning</button>
                            ) : (
                                <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={() => enrollHandler()}>Enroll</button>
                            )}
                        </div>
                    )}
                    <div>
                        <p>Total Students : {registered_students.length}</p>
                    </div>
                </>
            )
        } else if (role === 'instructor') {
            return (
                <>
                    <h1>{title}</h1>
                    <small>Description: {description}</small>
                    <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={() => Router.push(`instructor_view/${courseId}`)}>Manage</button>
                    <div>
                        <p>Total Students : {registered_students.length}</p>
                    </div>
                </>
            )

        } else {
            return (
                <>
                    <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={() => enrollNonUserHandler()}>Enroll</button>

                    <h1>{title}</h1>
                    <small>Description: {description}</small>
                    <div>
                        <p>Total Students : {registered_students.length}</p>
                    </div>
                </>

            )
        }
    }

    const Review = () => {
        return (
            <div className="px-5 py-5 rounded-sm bg-emerald-400 px-50">
                <h3>Students' Reviews</h3>
                    <div className="my-4 bg-emerald-100">
                        <h2>jake</h2>
                        <p>fake review 1</p>
                    </div>
                    <div className="my-4 bg-emerald-100">
                        <h2>jake</h2>
                        <p>fake review 1</p>
                    </div>
            </div>
        );
    }

    return (<>

        <Headerr />
        <div className="pt-10 px-48 flex">
            <div className="flex flex-col">
                <Mainbody />
            </div>
            <Review />
        </div>
    </>
    )
}


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

export default CourseDescription;