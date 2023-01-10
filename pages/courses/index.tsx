import { GetServerSideProps } from "next";
import Router from "next/router";
import { useEffect, useState } from "react";
import CourseElement from "../../component/CourseElement";
import { Headerr } from "../../component/headerr";
import prisma from "../../lib/prisma";


const AllCourses: React.FC = () => {

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            // const studentId = localStorage.getItem('id');
            try {
                const response = await fetch(`/api/course`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });
                const json = await response.json();
                console.log(json.data);
                setCourses(json.data);
                // console.log(loading);
            } catch (error) {
                // setError(error);
            } finally {
                setLoading(false);
                // console.log(loading);
            }

        };

        fetchData();
    }, []);

    // if (error) {
    //     return <p>An error occurred: {error.message}</p>;
    // }

    const onClickHandler = (courseId) => {
        Router.push('/courses/[id]', `/courses/${courseId}`);
    }

    return (
        <>
            <Headerr />
            <div className="pt-10 px-48">
            <h1 className="text-2xl pb-5">Our Courses</h1>

            {loading ?
                (<div>Loading ...</div>) :
                (<div >
                    {courses.map(course => (
                        <div className="border-solid rounded-3xl bg-white hover:scale-105 hover:border-2 hover:border-yellow-400 my-5
                         grid grid-cols-2 grid-rows-1   " key={course.id}>
                            <CourseElement course={course} />
                            <div className="flex items-center justify-end mr-5"><button  onClick = {() => onClickHandler(course.id)} className="bg-green-300 text-white rounded-3xl"><p className="px-4 py-1">Check Details</p></button></div>
                        </div>
                    ))}
                </div>)
            }
            </div>
        </>
    );

}
export default AllCourses;