import { GetServerSideProps } from "next";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Headerr } from "../../../component/headerr";
import prisma from "../../../lib/prisma";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullhorn } from "@fortawesome/free-solid-svg-icons";

const CourseMenu: React.FC = ({
  course: { id: courseId, title, description, instructor_name, imagePath },
  registered_students,
}) => {
  const [loading, setLoading] = useState(true);

  
  useEffect(() => { 
    //for new features
  }, []);

  const deleteHandler = async () => {
    try {
      const response = await fetch(`/api/course/${courseId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const json = await response.json();
      console.log(json);
      Router.push("/instructor/main");
    } catch (error) {
    } finally {
    }
  };
  const RegisStudent = () => {
    return (
      <div className="overflow-auto bg-purple-200 max-h-36  p-5">
        <h2>Registered Students</h2>
        {registered_students.length ? (
          registered_students.map((student) => (
            <div key={student.id}>
              <p>Name: {student.name}</p>
              <p className="text-xs">Email: {student.email}</p>
            </div>
          ))
        ) : (
          <h2>no registered students</h2>
        )}
      </div>
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

  const ScoreManage = () => {
    return (
      <div className="bg-amber-200 py-5 px-5">
        {" "}
        <h2>Score Manage</h2>
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
  const Assignment = () => {
    return (
      <div className="bg-green-200 py-5 px-5" onClick={()=>{Router.push(`/courses/instructor_view/${courseId}/assignment`)}}>
        <h2>Assignments</h2>
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

  const Mainbody = () => {
    return (
      <>
         <img className="w-[10rem] h-[10rem] rounded-3xl mb-5" src={imagePath} />
        <button
          className="bg-red-500 text-white py-2 px-4 rounded"
          onClick={() => deleteHandler()}
        >
          Delete
        </button>

        <h1>{title}</h1>
        <p>Description: {description}</p>
      </>
    );
  };

  return (
    <>
      <Headerr />
      <div className="pt-10 px-48">
        <h1 style={{ color: "red" }}>
          FOR DEBUGGING : THIS PAGE IS FOR INSTRUCTOR VIEW OF COURSE MENU
        </h1>
        <div className="grid grid-cols-3 grid-rows-1 pt-10">
          <div>
            <Mainbody />
          </div>
          <div className="col-span-2 grid grid grid-cols-2 gap-5 grid-rows-3">
            <RegisStudent />
            <Announcements />
            <ScoreManage />
            <DiscussBoard />
            <Assignment />
            <CourseMaterials />
          </div>
        </div>
      </div>
    </>
  );
};

// this function will check for
// course details, instructor name, lists of registered students
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

  const enrolls = await prisma.enroll.findMany({
    where: {
      courseId: courseId,
    },
  });
  const studentIdArray = enrolls.map((e) => e.studentId);

  const students = await prisma.student.findMany({
    where: {
      id: {
        in: studentIdArray,
      },
    },

    select: {
      id: true,
      email: true,
      name: true,
    },
  });

  return {
    props: {
      course: {
        ...JSON.parse(JSON.stringify(course)),
        instructor_name: course.instructor.name,
      },
      registered_students: students,
    },
  };
};

export default CourseMenu;
