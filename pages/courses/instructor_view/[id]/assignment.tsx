import { useEffect, useState } from "react";
import CourseElement from "../../../../component/CourseElement";
import { Headerr } from "../../../../component/headerr";
import Router, { useRouter } from "next/router";
import prisma from "../../../../lib/prisma";
import { GetServerSideProps } from "next";
const Home: React.FC = ({
  course: { id: courseId, title, description, instructor_name, imagePath },
}) => {
 
  const [allasign, setAllassign] = useState([]);
  const router = useRouter();
  const [mode, setMode] = useState(0); // mode 0 = default 1 = create
  const [annoucement, setAnnouncement] = useState({
    title: "",
    description: "",
    pdate: "",
    duedate: "",
    fullscore: 0,
  });

  useEffect(() => {
    getAllassign();
  }, [mode]);

  const getAllassign = async () => {
    const nes = {
      courseid: courseId,
      instructorid: localStorage.getItem("id"),
    };

    const response = await fetch("/api/announcement/instructor/getall", {
      method: "POST",
      body: JSON.stringify(nes),
    });
    const res = await response.json();
    console.log(res.body);
    setAllassign(res.body);
  };

  const sentNewAssign = async (e) => {
    e.preventDefault();

    const newAn = {
      title: e.target.title.value,
      des: e.target.descrip.value,
      pdate: e.target.pdate.value,
      ddate: e.target.ddate.value,
      full: e.target.full.value,
      courseid: courseId,
      instructorid: localStorage.getItem("id"),
    };

    const response = await fetch("/api/announcement/instructor/new", {
      method: "POST",
      body: JSON.stringify(newAn),
    });
    const res = await response.json();
    console.log(res.body + "  dddddd");
    setMode(0);
  };

  const Finished = ()=>{
    
    const today = new Date();
  
    const nowna = allasign.map((asign) => {
      const ddate = new Date(asign.duedate)
      const pdate = new Date(asign.publishtime)
      // console.log(typeof(hi))
      // console.log("now: ", today);
      // console.log("due date: ", hi);
      // console.log(hi > today, " fffffff");
      if (ddate < today ) {
        return (
          <>
            <div className="grid grid-cols-5 bg-green-200 my-2 mx-2">
              <p>{asign.topic}</p>
              <p>{asign.fullscore}</p>
              <div><button className="bg-blue-500 text-white py-1 px-4 rounded" onClick={()=>{router.push(`/courses/instructor_view/${courseId}/assign/${asign.assignmentid}`)}}>Details</button></div>
              <div><button className="bg-blue-500 text-white py-1 px-4 rounded">Edit</button></div>
              <div><button className="bg-blue-500 text-white py-1 px-4 rounded">Delete</button></div>
            </div>
          </>
        );
      } else {
        return <></>;
      }
    });
    return <>{nowna}</>;
  }

  const Waiting=()=>{
    
    const today = new Date();
  
    const nowna = allasign.map((asign) => {
      const ddate = new Date(asign.duedate)
      const pdate = new Date(asign.publishtime)
      // console.log(typeof(hi))
      // console.log("now: ", today);
      // console.log("due date: ", hi);
      // console.log(hi > today, " fffffff");
      if (today < pdate) {
        return (
          <>
            <div className="grid grid-cols-5 bg-green-200 my-2 mx-2">
              <p>{asign.topic}</p>
              <p>{asign.fullscore}</p>
              <div><button className="bg-blue-500 text-white py-1 px-4 rounded" onClick={()=>{router.push(`/courses/instructor_view/${courseId}/assign/${asign.assignmentid}`)}}>Details</button></div>
              <div><button className="bg-blue-500 text-white py-1 px-4 rounded">Edit</button></div>
              <div><button className="bg-blue-500 text-white py-1 px-4 rounded">Delete</button></div>
            </div>
          </>
        );
      } else {
        return <></>;
      }
    });
    return <>{nowna}</>;
  }
  const Ongoing = () => {
 
    const today = new Date();
  
    const nowna = allasign.map((asign) => {
      const ddate = new Date(asign.duedate)
      const pdate = new Date(asign.publishtime)
      // console.log(typeof(hi))
      // console.log("now: ", today);
      // console.log("due date: ", hi);
      // console.log(hi > today, " fffffff");
      if (ddate >= today && today >= pdate) {
        return (
          <>
            <div className="grid grid-cols-5 bg-green-200 my-2 mx-2">
              <p>{asign.topic}</p>
              <p>{asign.fullscore}</p>
              <div><button className="bg-blue-500 text-white py-1 px-4 rounded" onClick={()=>{router.push(`/courses/instructor_view/${courseId}/assign/${asign.assignmentid}`)}}>Details</button></div>
              <div><button className="bg-blue-500 text-white py-1 px-4 rounded">Edit</button></div>
              <div><button className="bg-blue-500 text-white py-1 px-4 rounded">Delete</button></div>
            </div>
          </>
        );
      } else {
        return <></>;
      }
    });
    return <>{nowna}</>;
  };

  const Mainbody = () => {
    if (mode === 0) {
      return (
        <>
          <h1>Welcome to instructor Assignment</h1>
          <div>
            <h1>Ongoing Assignment</h1>
            <Ongoing />
          </div>
          <div>
            <h1>Finished Assignment</h1>
            <Finished/>
          </div>
          <div>
            <h1>Waiting Assignment</h1>
            <Waiting/>
          </div>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded"
            onClick={() => {
              setMode(1);
            }}
          >
            <h1>Create Assignment</h1>
          </button>
        </>
      );
    } else if (mode === 1) {
      return (
        <>
          <h1>Create Course</h1>
          <form onSubmit={sentNewAssign}>
            <div className="grid grid-cols-3 grid-rows-5">
              <div className="my-4 col-span-3">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Title
                </label>
                <input
                  required
                  type="text"
                  id="title"
                  name="title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="my-4 row-span-2 col-span-3">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Description
                </label>
                <textarea
                  required
                  rows={6}
                  id="descrip"
                  name="descrip"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className=" mr-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Publish Date
                </label>
                <input
                  required
                  type="date"
                  id="pdate"
                  name="pdate"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="mx-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Due date
                </label>
                <input
                  required
                  type="date"
                  id="ddate"
                  name="ddate"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="ml-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Full Score
                </label>
                <input
                  type="number"
                  id="full"
                  name="full"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <button className="bg-blue-500 text-white py-2 px-4 rounded">
                  <p>Create Assignment</p>
                </button>
              </div>
            </div>
          </form>
        </>
      );
    } else {
      return <></>;
    }
  };

  return (
    <>
      <Headerr />
      <div className="pt-10 px-48">
        <Mainbody />
      </div>
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const courseId = Number(
    Array.isArray(context.params.id) ? context.params.id[0] : context.params.id
  );
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: { instructor: true },
  });

  return {
    props: {
      course: {
        ...JSON.parse(JSON.stringify(course)),
        instructor_name: course.instructor.name,
      },
    },
  };
};

export default Home;
