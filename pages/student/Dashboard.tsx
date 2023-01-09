import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import CourseElement from "../../component/CourseElement";
import { Headerr } from "../../component/headerr";
import prisma from "../../lib/prisma";

const StudentDashboard: React.FC = () => {

    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const studentId = localStorage.getItem('id');
            try {
                const response = await fetch(`/api/enroll/get_courses/${studentId}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });
                const json = await response.json();
                //console.log(json.data);
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

    return (
        <>
            <Headerr />
            <p>Your Courses</p>

            {loading ?
                (<div>Loading ...</div>) :
                (<div>
                    {courses.map(course => (
                        <div key={course.id}>
                            <CourseElement course={course} />
                        </div>
                    ))}
                </div>)
            }
        </>
    );

}
export default StudentDashboard;