import { GetServerSideProps } from "next";
import Router from "next/router";
import { useEffect, useState } from "react";
import { Headerr } from "../../component/headerr";
import prisma from "../../lib/prisma";

const CourseDescription: React.FC = ({ course: { id: courseId, title, description, instructor_name, imagePath }, registered_students }) => {
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
        //console.log(typeof courseId);
        //console.log(typeof studentId);
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
                    <p>Instructor: {instructor_name}</p>
                    <p className="text-slate-400">Description: {description}</p>
                    <div>
                        <p className="text-slate-600">Total Students : {registered_students.length}</p>
                    </div>

                    {loading ? (<div>Loading ...</div>) : (
                        <div>
                            {enrolled ? (
                                <div className="mt-5">
                                    <button className="bg-courseBtnBgColor text-white py-2 px-4 rounded-full" onClick={() => Router.push(`student_view/${courseId}`)}>Continue Learning</button>
                                </div>) 
                            : (
                                <div className="mt-5">
                                    <button className="bg-courseBtnBgColor text-white py-2 px-4 rounded-full" onClick={() => enrollHandler()}>Enroll</button>
                                </div>
                            )}
                        </div>
                    )}
                </>
            )
        } else if (role === 'instructor') {
            return (
                <>
                    <p className="text-slate-400">Description: {description}</p>
                    <div>
                        <p className="text-slate-600">Total Students : {registered_students.length}</p>
                    </div>
                    <div className="mt-5">
                        <button className="bg-courseBtnBgColor text-white py-2 px-4 rounded-full" onClick={() => Router.push(`instructor_view/${courseId}`)}>Manage</button>
                    </div>
                    </>
            )

        } else {
            return (
                <>

                    <p className="text-slate-400">Description: {description}</p>
                    <div>
                        <p className="text-slate-600">Total Students : {registered_students.length}</p>
                    </div>
                    <div className="mt-5">
                        <button className="bg-courseBtnBgColor text-white py-2 px-4 rounded-full" onClick={() => enrollNonUserHandler()}>Enroll</button>
                    </div>
                </>

            )
        }
    }

    return (<>
    <div className="bg-neutral-100">

        <Headerr />
        <div className="mx-[25%] mt-10 pt-5 pb-2 px-4 shadow-xl bg-white">
            <div className="flex justify-center my-4">
                <div className="grid grid-cols-4">
                    <div className="flex items-center justify-center col-span-2 mx-10">
                        <img className="w-[13rem] h-[13rem] rounded-3xl mb-5" src={imagePath} />
                    </div>
                    
                    <div className="flex flex-col mr-4 p-2 rounded-md col-span-2">
                        <h1 className="text-4xl mb-5">{title}</h1>
                        <Mainbody />
                    </div>
                </div>
            </div>
        </div>
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

    /*  add imagePath field to this course*/
    if (course.photoId !== null) {
        const photo = await prisma.photo.findUnique({
            where: {
                id: course.photoId,
            },
        });
        course["imagePath"] = photo.filePath;
    }
    else {
        course["imagePath"] = "/dummypic.png"
    }

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