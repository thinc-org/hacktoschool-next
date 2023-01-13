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
  const [page, setPage] = useState();
  const [apage, setApage] = useState([]);
  const [cpage, setCpage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      // const studentId = localStorage.getItem('id');
      try {
        const response = await fetch(`/api/course`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const json = await response.json();
        //console.log(json.data);
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

  //   useEffect(() => {
  //     Pagena();
  //   }, []);

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

  // if (error) {
  //     return <p>An error occurred: {error.message}</p>;
  // }

  const onClickHandler = (courseId) => {
    Router.push("/courses/[id]", `/courses/${courseId}`);
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

  const searchBox = async (e: { preventdefault: () => void; target: { search: { value: any; }; }; }) =>{
    e.preventDefault();
    console.log('sssssssss')
    const result = await fetch('/api/course',{
      method:'POST',
      body:e.target.search.value
    })
    const res = await result.json()
    console.log(res.body)
    setCourses(res.body);
    setPage(Math.ceil(res.body.length / 10));
    
  }

  return (
    <>
      <Headerr />
      <div className="pt-10 px-48">
        <h1 className="text-2xl pb-5">Our Courses</h1>
        <form onSubmit={searchBox}>
          <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              type="search"
              id="search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search For Course Name, Instructor Name or Description  Click seach without filling this form will search for all the courses"
             
            />
            <button
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </form>

        {loading ? <div>Loading ...</div> : <Bodypage />}
        <div className="flex items-center justify-center">
          <Pagelay />
        </div>
      </div>
    </>
  );
};
export default AllCourses;
