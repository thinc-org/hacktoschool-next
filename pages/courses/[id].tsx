import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { Headerr } from "../../component/headerr";
import prisma from "../../lib/prisma";

const CourseHome: React.FC = ({ id:courseId, title, description }) => {
    const [role, setRole] = useState('')
    useEffect(() => {
        setRole(localStorage.getItem('role'));
    }, []);
    
    const enrollHandler = async () => {
        const studentId = parseInt(localStorage.getItem('id'));
        console.log(typeof courseId);
        console.log(typeof studentId);
        const body = {
            studentId: studentId,
            courseId: courseId
        };
        try {
            const response = await fetch(`/api/enroll`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });
            const json = await response.json();
            console.log(json);
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

                <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={() => enrollHandler()}>enroll</button>
                <button className="bg-red-500 text-white py-2 px-4 rounded" onClick={() => leaveHandler ()}>leave</button>
                <h1>{title}</h1>
                <small>Description: {description}</small>
            </>
        )
    } else if (role === 'instructor') {
        return (
            <>
                <Headerr />
                <button className="bg-red-500 text-white py-2 px-4 rounded">delete</button>

                <h1>{title}</h1>
                <small>Description: {description}</small>
            </>
        )

    } else {
        return (
            <>
                <Headerr />

                <button className="bg-blue-500 text-white py-2 px-4 rounded">enroll (will redirect you to sign in)</button>

                <h1>{title}</h1>
                <small>Description: {description}</small>
            </>

        )
    }
}


export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = Number(Array.isArray(context.params.id) ? context.params.id[0] : context.params.id)
    const course = await prisma.course.findUnique({
        where: { id },
    })
    return { props: { ...JSON.parse(JSON.stringify(course)) } }
}

export default CourseHome;