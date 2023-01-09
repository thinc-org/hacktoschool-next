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
            <p>Our Courses</p>

            {loading ?
                (<div>Loading ...</div>) :
                (<div>
                    {courses.map(course => (
                        <div key={course.id} onClick = {() => onClickHandler(course.id)}>
                            <CourseElement course={course} />
                        </div>
                    ))}
                </div>)
            }
        </>
    );

}
export default AllCourses;