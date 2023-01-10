import { GetServerSideProps } from "next";
import Router from "next/router";
import { useEffect, useState } from "react";
import { Headerr } from "../../../component/headerr";
import prisma from "../../../lib/prisma";

const CourseMenu: React.FC = ({ course: { id: courseId, title, description, instructor_name }}) => {
    // for some loading
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        // for some future features
    }, []);


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
            // once leave the course, redirect them t
            Router.push('/student/dashboard');
            // console.log(loading);
        } catch (error) {
            // setError(error);
        } finally {
            // setLoading(false);
            // console.log(loading);
        }
    }

    const Mainbody = () => {
        return (
            <>
                <h1>{title}</h1>
                <small>Description: {description}</small>
                <p>Instructor: {instructor_name}</p>

            </>
        )
    }

    const Announcements = () => {
        return (
            <div className="bg-red-400 py-5 px-5">
                Announcements
            </div>
        )
    }   
    const LiveChat = () => {
        return (
            <div className="bg-emerald-500 py-5 px-5">
                Live Chat
            </div>
        )
    }   
    const ScoreGraphs = () => {
        return (
            <div className="bg-amber-500 py-5 px-5">
                Score Graphs
            </div>
        )
    }   

    return (<>

        <Headerr />
        <div className="pt-10 px-48">
            <h1 style={{ color: "red" }}>FOR DEBUGGING : THIS PAGE IS FOR STUDENT VIEW OF COURSE MENU</h1>
            <Mainbody />
            <button className="bg-red-500 text-white py-2 px-4 rounded" onClick={() => leaveHandler()}>Drop</button>

            <Announcements />
            <LiveChat />
            <ScoreGraphs/>
        
        
        </div>
    </>
    )
}

// this function will check for 
// course details, instructor_name
export const getServerSideProps: GetServerSideProps = async (context) => {
    const courseId = Number(Array.isArray(context.params.id) ? context.params.id[0] : context.params.id)
    const course = await prisma.course.findUnique({
        where: { id: courseId },
        include: { instructor: true },
    })

    return { props: { course: { ...JSON.parse(JSON.stringify(course)), instructor_name: course.instructor.name } } }
}

export default CourseMenu;