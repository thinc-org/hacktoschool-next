import { GetServerSideProps } from "next";
import Router from "next/router";
import { useEffect, useState } from "react";
import CourseElement from "../../component/CourseElement";
import { Headerr } from "../../component/headerr";
import prisma from "../../lib/prisma";

const StudentDashboard: React.FC = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState();
  const [apage, setApage] = useState([]);
  const [cpage, setCpage] = useState(0);

  useEffect(() => {
    // check for all courses that this student has enrolled
    const fetchData = async () => {
      const studentId = localStorage.getItem("id");
      try {
        const response = await fetch(`/api/enroll/get_courses/${studentId}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const json = await response.json();
        console.log(json.data);
        console.log(typeof json.data);
        setCourses(json.data);
        setPage(Math.ceil(json.data.length / 10));
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

  useEffect(() => {
    console.log(page);
    if (page) {
      pagena();
    }
  }, [page]);

  const pagena = () => {
    let anum = 0;
    let groupp = [];
    while (anum != page) {
      groupp.push(anum);
      anum++;
    }
    setApage(groupp);
  };

  const Pagelay = () => {
    const hi = apage.map((element) => {
      return (
        <>
          <div
            className={
              "bg-black mx-4 mb-5 hover:scale-125 flex items-center justify-center rounded-full text-white " +
              (element === cpage ? " w-12 h-12" : " w-8 h-8")
            }
            onClick={() => {
              setCpage(element);
            }}
          >
            <p>{element + 1}</p>
          </div>
        </>
      );
    });
    return <>{hi}</>;
  };

  const Bodypage = () => {
    return (
      <div>
        {courses.map((course, i) => {
          if (Math.floor(i / 10) === cpage) {
            return (
              <div
                className="border-solid rounded-3xl bg-white hover:scale-105 hover:border-2 hover:border-yellow-400 my-5
                    grid grid-cols-2 grid-rows-1 overflow-x-hidden   "
                key={course.id}
              >
                <div className="">
                  <img
                    className="object-fill w-[10rem] h-[10rem]"
                    src={course.imagePath}
                  />
                </div>
                <div>
                  <CourseElement course={course} />
                  <div className=" mx-5">
                    <button
                      onClick={() => onClickHandler(course.id)}
                      className="bg-green-300 text-white rounded-3xl"
                    >
                      <p className="px-4 py-1">Check Details</p>
                    </button>
                  </div>
                </div>
              </div>
            );
          } else {
            return <></>;
          }
        })}
      </div>
    );
  };

  // if (error) {
  //     return <p>An error occurred: {error.message}</p>;
  // }

  const onClickHandler = (courseId) => {
    Router.push(
      "/courses/student_view/[id]",
      `/courses/student_view/${courseId}`
    );
  };

  return (
    <>
      <Headerr />
      <div className="pt-10 px-48">
        <h1 className="pb-3 text-2xl">Your Courses</h1>

        {loading ? (
          <div>Loading ...</div>
        ) : (
          <div>
            <Bodypage />
            <div className="flex items-center justify-center">
              <Pagelay />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export default StudentDashboard;
