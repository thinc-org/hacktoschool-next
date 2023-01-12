import { useEffect, useState } from "react";
import CourseElement from "../../component/CourseElement";
import { Headerr } from "../../component/headerr";
import Router, { useRouter } from "next/router";
export default function Home() {
  const router = useRouter();
  const [allcourse, setAllcourse] = useState([]);
  const [page, setPage] = useState();
  const [apage, setApage] = useState([]);
  const [cpage, setCpage] = useState(0);

  useEffect(() => {
    getAllCourse();
  }, []);

  const getAllCourse = async () => {
    const response = await fetch("/api/instructor/allcourse", {
      method: "POST",
      body: localStorage.getItem("id"),
    });
    const res = await response.json();
    console.log(res);
    setAllcourse(res.body);
    setPage(Math.ceil(res.body.length / 10));
  };

 
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
            className={"bg-black mx-4 mb-5 hover:scale-125 flex items-center justify-center rounded-full text-white "+(element === cpage ? ' w-12 h-12':' w-8 h-8')}
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

  const onClickHandler = (courseId) => {
    Router.push(
      "/courses/instructor_view/[id]",
      `/courses/instructor_view/${courseId}`
    );
  };

  const Bodypage = () => {
    return (
      <div>
        {allcourse.map((course, i) => {
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

  return (
    <>
      <Headerr />
      <div className="pt-10 px-48">
        <h1 className="text-2xl mb-5">Your Courses</h1>
        <Bodypage />
        <div className="flex items-center justify-center">
          <Pagelay />
        </div>
        <button
          className="bg-courseBtnBgColor text-white py-3 px-4 rounded-full my-5"
          onClick={() => {
            router.push("/instructor/createcourse");
          }}
        >
          Create Course
        </button>
      </div>
    </>
  );
}
