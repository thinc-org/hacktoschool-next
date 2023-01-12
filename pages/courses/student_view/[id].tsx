import { GetServerSideProps } from "next";
import Router from "next/router";
import { useEffect, useState } from "react";
import { Headerr } from "../../../component/headerr";
import prisma from "../../../lib/prisma";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullhorn } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

const CourseMenu: React.FC = ({
  course: { id: courseId, title, description, instructor_name, imagePath },
}) => {
  // for some loading
  const [loading, setLoading] = useState(true);
  const [notiforass,setNotiforass] = useState(0)

  useEffect(() => {
    //adding font awesome
    // for some future features
    getNoti()
  }, []);
  //get noti for assign that pending (status === 0 and ontime)
  const getNoti = async()=>{
    const data = {
      cid: courseId,
      sid: localStorage.getItem("id"),
    };
    const response = await fetch("/api/assignment/student/getallwithid", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const res = await response.json();
    //console.log(res.body);
    let num = 0
    res.body.forEach(element => {
      const today = new Date();
      const ddate = new Date(element.duedate);
      const pdate = new Date(element.publish);  
      if(ddate >= today && today >= pdate && element.status === 0){
        num+=1;
      }
    });
    setNotiforass(num)
    //console.log(num)
   
  }

  const leaveHandler = async () => {
    const studentId = parseInt(localStorage.getItem("id"));
    console.log(typeof courseId);
    console.log(typeof studentId);
    const body = {
      studentId: studentId,
      courseId: courseId,
    };
    try {
      const response = await fetch(`/api/enroll`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await response.json();
      // once leave the course, redirect them t
      Router.push("/student/dashboard");
      // console.log(loading);
    } catch (error) {
      // setError(error);
    } finally {
      // setLoading(false);
      // console.log(loading);
    }
  };

  const Mainbody = () => {
    return (
      <>
        <img className="w-[10rem] h-[10rem] rounded-3xl mb-5" src={imagePath} />
        <h1>{title}</h1>
        <small>Description: {description}</small>
        <p>Instructor: {instructor_name}</p>
      </>
    );
  };

  const Announcements = () => {
    return (
      <div className="bg-red-200 py-5 px-5">
        <FontAwesomeIcon icon={faBullhorn} />
        <h2>Announcements</h2>
      </div>
    );
  };
  const LiveChat = () => {
    return (
      <div className="bg-emerald-200 py-5 px-5">
        {" "}
        <h2>Live Chats</h2>
      </div>
    );
  };
  const ScoreGraphs = () => {
    return (
      <div className="bg-amber-200 py-5 px-5">
        {" "}
        <h2>Score Graphs</h2>
      </div>
    );
  };
  const DiscussBoard = () => {
    return (
      <div className="bg-blue-200 py-5 px-5">
        <h2>Discussion Board</h2>
      </div>
    );
  };
  const CourseMaterials = () => {
    return (
      <div className="bg-green-200 py-5 px-5">
        <h2>Course Materials</h2>
      </div>
    );
  };
  const Assignment = () => {
    const Noti = ()=>{
      if(notiforass>0){
        return<div className=" ml-3 inline-flex items-center justify-center w-8 h-8 text-xs text-white bg-red-500 rounded-full dark:border-gray-900"><h3>{notiforass}</h3></div>
      }
      else{
        return<></>
      }
    }
    return (
      <div className="bg-purple-200 items-center py-5 px-5 inline-flex" onClick={()=>{Router.push(`/courses/student_view/${courseId}/assign`)}}>
        <h2>Assignments</h2>
        <Noti/>
      </div>
    );
  };

  return (
    <>
      <Headerr />
      <div className="pt-10 px-48">
        <h1 style={{ color: "red" }}>
          FOR DEBUGGING : THIS PAGE IS FOR STUDENT VIEW OF COURSE MENU
        </h1>
        <div className="grid grid-cols-3 grid-rows-1 pt-10">
          <div>
            <Mainbody />
            <button
              className="bg-red-500 text-white py-2 px-4 rounded"
              onClick={() => leaveHandler()}
            >
              Drop
            </button>
          </div>
          <div className="col-span-2 grid grid grid-cols-2 gap-5 grid-rows-3">
            <Announcements />
            <LiveChat />
            <ScoreGraphs />
            <DiscussBoard />
            <CourseMaterials />
            <Assignment />
          </div>
        </div>
      </div>
    </>
  );
};

// this function will check for
// course details, instructor_name
export const getServerSideProps: GetServerSideProps = async (context) => {
  const courseId = Number(
    Array.isArray(context.params.id) ? context.params.id[0] : context.params.id
  );
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: { instructor: true },
  });


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

  return {
    props: {
      course: {
        ...JSON.parse(JSON.stringify(course)),
        instructor_name: course.instructor.name,
        // imagePath: (course.photoId === null ? "/dummypic.png" : course.photo.filePath),  /* seriously no idea why this doesn't work when instructor does*/
      },
    },
  };
};

export default CourseMenu;
