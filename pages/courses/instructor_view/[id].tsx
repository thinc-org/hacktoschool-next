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
  announcements,
}) => {
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [notiforass, setNotiforass] = useState(0)

  useEffect(() => {
    //for new features
    getNoti()
  }, []);

  //get noti for assign that pending (status === 0 and ontime)
  const getNoti = async () => {
    const data = {
      cid: courseId,
      instructorid: localStorage.getItem("id"),
    };
    const response = await fetch("/api/assignment/instructor/getall", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const res = await response.json();
    //console.log(res.body);
    let num = 0
    for (let element of res.body) {
      if (element.assignmentid) {
        //console.log(element)
        const response = await fetch("/api/assignment/instructor/getass", {
          method: "POST",
          body: element.assignmentid,
        });
        const res2 = await response.json()
        res2.body.forEach(element1 => {
          if (element1.status === 1) {
            num++;
          }

        });
      }
    }
    setNotiforass(num)
    //console.log(num)
  }

  const RegisStudent = () => {
    return (
      <div className="hover:scale-105 overflow-auto bg-purple-200 max-h-36  p-5">
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

  function AnnouncementModal() {
    return (
      <>
        {showModal ? (
          <>
            <div
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
              onClick={() => setShowModal(false)}
            >
              <div className="relative w-auto my-6 mx-auto max-w-3xl" onClick={(event) => event.stopPropagation()}>
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                    <h3 className="text-xl ">
                      Announcements
                    </h3>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto overflow-auto max-h-80">
                    <ul>
                      {
                        announcements.map((announcement) => {
                          return (<li className="py-3 border-b border-sold border-slate-300 text-slate-600" key={announcement.id}><p>⚠️{announcement.message}</p></li>)
                        })
                      }
                    </ul>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200">
                    <button
                      className="bg-red-500 text-white active:bg-red-600 font-bold text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      CLOSE
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}
      </>
    );
  }


  const newAnnouncement = () => {
    Router.push(`${courseId}/announcements/create`);
  }

  const Announcements = () => {
    return (
      <div className="hover:scale-105 bg-red-200 py-5 px-5 flex flex-row items-start justify-between">
        <button className="" onClick={() => setShowModal(true)}>
          <h2 className="">Announcements</h2>
        </button>

        <button className="bg-neutral-100 ml-5 px-2 text-red-500 text-4xl rounded shadow-lg hover:scale-110 opacity-90 hover:opacity-100" onClick={newAnnouncement}><p>+</p></button>
      </div>
    );
  };

  const ScoreManage = () => {
    return (
      <div className="hover:scale-105 bg-amber-200 py-5 px-5" onClick={() => { Router.push(`/courses/instructor_view/${courseId}/score`) }}>
        {" "}
        <h2>Course Score</h2>
      </div>
    );
  };

  const DiscussBoard = () => {
    return (
      <div className="hover:scale-105 bg-blue-200 py-5 px-5" onClick={() => { Router.push(`/discussion/${courseId}`) }}>
        <h2>Discussion Board</h2>
      </div>
    );
  };
  const Assignment = () => {
    const Noti = () => {
      if (notiforass > 0) {
        return <div className="hover:scale-105 ml-3 inline-flex items-center justify-center w-8 h-8 text-xs text-white bg-red-500 rounded-full dark:border-gray-900"><h3>{notiforass}</h3></div>
      }
      else {
        return <></>
      }
    }
    return (
      <div className="hover:scale-105 bg-green-200 py-2 px-5 inline-flex items-center" onClick={() => { Router.push(`/courses/instructor_view/${courseId}/assignment`) }}>
        <h2>Assignments</h2>
        <Noti />
      </div>
    );
  };

  const CourseMaterials = () => {
    return (
      <div className="bg-slate-200 py-5 px-5 hover:scale-105">
        <h2>Course Materials</h2>
      </div>
    );
  };

  const Mainbody = () => {
    return (
      <>
        <img className="w-[10rem] h-[10rem] rounded-3xl mb-5" src={imagePath} />
        <h1 className="text-8xl border-b mb-2 pb-2 mr-10 border-neutral-400">{title}</h1>
        <p className="text-slate-400">Description: {description}</p>

          <button
            className="mt-5 bg-red-500 text-white py-2 px-4 rounded"
            onClick={() => deleteHandler()}
          >
            <p>Delete</p>
          </button>

      </>
    );
  };


  const ViewComments = () => {
    return (
      <div className="bg-sky-200 py-5 px-5 hover:scale-105">
        <button onClick={() => { Router.push(`/courses/instructor_view/${courseId}/viewAnonymousComments`) }}><h2>View Comments</h2></button>
      </div>
    )
  }
  const ToGroupChat = () => {
    return (
      <div className="bg-fuchsia-200 py-5 px-5 hover:scale-105">
        <button onClick={() => { Router.push(`/courses/instructor_view/${courseId}/chat/welcomeRoom`) }}><h2>GroupChat</h2></button>
      </div>
    )
  }

  return (
    <>
      <AnnouncementModal />

      <Headerr />
      <div className="pt-10 px-48 mb-10">
        <div className="grid grid-cols-3 grid-rows-1 pt-10">
          <div>
            <Mainbody />
          </div>
          <div className="col-span-2 grid grid grid-cols-2 gap-5 grid-rows-4 text-slate-700">
            <RegisStudent />
            <Announcements />
            <ScoreManage />
            <DiscussBoard />
            <Assignment />
            <ViewComments />
            <ToGroupChat />
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

  //find all announcements for this class
  const announcements = await prisma.announcement.findMany({
    where: {
      courseId: courseId
    },
  });

  return {
    props: {
      course: {
        ...JSON.parse(JSON.stringify(course)),
        instructor_name: course.instructor.name,
      },
      registered_students: students,
      announcements: announcements
    },
  };
};

export default CourseMenu;