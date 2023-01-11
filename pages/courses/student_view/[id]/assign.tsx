import { useEffect, useState } from "react";
import CourseElement from "../../../../component/CourseElement";
import { Headerr } from "../../../../component/headerr";
import Router, { useRouter } from "next/router";
import prisma from "../../../../lib/prisma";
import { GetServerSideProps } from "next";
const Home: React.FC = ({
  course: { id: courseId, title, description, instructor_name, imagePath },
}) => {
  const [mode, setMode] = useState(0);
  const [assign, setAssign] = useState([]);
  const [working, setWorking] = useState({
    assignmentid: 0,
    topic: "",
    description: "",
    answer: "",
  }); //set assignment id that working on
  useEffect(() => {
    getSpeAssignments();
  }, []);

  const getSpeAssignments = async () => {
    const data = {
      cid: courseId,
      sid: localStorage.getItem("id"),
    };
    const response = await fetch("/api/assignment/student/getallwithid", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const res = await response.json();
    console.log(res.body);
    setAssign(res.body);
  };

  const PendingAss = () => {
    const pending = assign.map((element, i) => {
      if (i === 0) {
        return (
          <>
            <div className="bg-purple-200 grid grid-cols-5 p-3">
              <p>Assignment Topic</p>
              <p>Full Score</p>
              <p>Publish Date</p>
              <p>Due Date</p>
              <p>Submit</p>
            </div>
          </>
        );
      } else {
        const today = new Date();
        const ddate = new Date(element.duedate);
        const pdate = new Date(element.publish);
        if (ddate >= today && today >= pdate && element.status === 0) {
          return (
            <>
              {/* .substring(0,10) */}
              <div className="overflow-hidden bg-yellow-200 grid grid-cols-5  px-3 py-1">
                <p>{element.topic}</p>
                <p>{element.fullscore}</p>
                <p>{element.publish.substring(0, 10)}</p>
                <p>{element.duedate.substring(0, 10)}</p>
                <div>
                  <button
                    className="bg-blue-500 text-white py-1 px-4 rounded"
                    onClick={() => {
                      setMode(1);
                      setWorking({
                        assignmentid: element.assignmentid,
                        topic: element.topic,
                        description: element.description,
                        answer: element.answer,
                      });
                    }}
                  >
                    <p>Submit</p>
                  </button>
                </div>
              </div>
            </>
          );
        }
      }
    });
    return <>{pending}</>;
  };

  const StillEdit = () => {
    const pending = assign.map((element, i) => {
      if (i === 0) {
        return (
          <>
            <div className="bg-purple-200 grid grid-cols-5 p-3">
              <p>Assignment Topic</p>
              <p>Full Score</p>
              <p>Publish Date</p>
              <p>Due Date</p>
              <p>Edit</p>
            </div>
          </>
        );
      } else {
        const today = new Date();
        const ddate = new Date(element.duedate);
        const pdate = new Date(element.publish);
        if (ddate >= today && today >= pdate && element.status === 1) {
          return (
            <>
              {/* .substring(0,10) */}
              <div className="overflow-hidden bg-blue-200 grid grid-cols-5  px-3 py-1">
                <p>{element.topic}</p>
                <p>{element.fullscore}</p>
                <p>{element.publish.substring(0, 10)}</p>
                <p>{element.duedate.substring(0, 10)}</p>
                <div>
                  <button
                    className="bg-blue-500 text-white py-1 px-4 rounded"
                    onClick={() => {
                      setMode(1);
                      setWorking({
                        assignmentid: element.assignmentid,
                        topic: element.topic,
                        description: element.description,
                        answer: element.answer,
                      });
                    }}
                  >
                    <p>Edit</p>
                  </button>
                </div>
              </div>
            </>
          );
        }
      }
    });
    return <>{pending}</>;
  };
  const Submitted = () => {
    const pending = assign.map((element, i) => {
      if (i === 0) {
        return (
          <>
            <div className="bg-purple-200 grid grid-cols-6 p-3">
              <p>Assignment Topic</p>
              <p>Status</p>
              <p>Publish Date</p>
              <p>Due Date</p>
              <p>Score</p>
              <p>Info</p>
            </div>
          </>
        );
      } else {
        const today = new Date();
        const ddate = new Date(element.duedate);
        const pdate = new Date(element.publish);
        let stat = ''
        if(element.status === 1){
           stat = 'pending'
        }else if (element.status === 2){
          stat = 'graded'
        }
        else{
          stat = 'noob'
        }
        if (ddate < today && element.status !== 0) {
          return (
            <>
              {/* .substring(0,10) */}
              <div className="overflow-hidden bg-green-200 grid grid-cols-6  px-3 py-1">
                <p>{element.topic}</p>
                <p>{stat}</p>
                <p>{element.publish.substring(0, 10)}</p>
                <p>{element.duedate.substring(0, 10)}</p>
                <p>{element.score}/{element.fullscore}</p>
                <p>  <button
                    className="bg-blue-500 text-white py-1 px-4 rounded"
                    onClick={() => {
                      setMode(2);
                      setWorking({
                        assignmentid: element.assignmentid,
                        topic: element.topic,
                        description: element.description,
                        answer: element.answer,
                        comment: element.comment
                      });
                    }}
                  >
                    <p>View</p>
                  </button></p>
              </div>
            </>
          );
        }
      }
    });
    return <>{pending}</>;
  };

  const Overdue = () => {
    const pending = assign.map((element, i) => {
      if (i === 0) {
        return (
          <>
            <div className="bg-purple-200 grid grid-cols-5 p-3">
              <p>Assignment Topic</p>
              <p>Publish Date</p>
              <p>Due Date</p>
              <p>Score</p>
              <p>Info</p>
            </div>
          </>
        );
      } else {
        const today = new Date();
        const ddate = new Date(element.duedate);
        const pdate = new Date(element.publish);
        if (ddate < today && element.status === 0) {
          return (
            <>
              {/* .substring(0,10) */}
              <div className="overflow-hidden bg-red-200 grid grid-cols-5  px-3 py-1">
                <p>{element.topic}</p>
                <p>{element.publish.substring(0, 10)}</p>
                <p>{element.duedate.substring(0, 10)}</p>
                <p>0/{element.fullscore}</p>
                <p>  <button
                    className="bg-blue-500 text-white py-1 px-4 rounded"
                    onClick={() => {
                      setMode(2);
                      setWorking({
                        assignmentid: element.assignmentid,
                        topic: element.topic,
                        description: element.description,
                        answer: element.answer,
                        comment: element.comment
                      });
                    }}
                  >
                    <p>View</p>
                  </button></p>
              </div>
            </>
          );
        }
      }
    });
    return <>{pending}</>;
  };

  const sendAws = async (e) => {
    e.preventDefault();
    const data = {
      assignid: working.assignmentid,
      answer: e.target.answer.value,
      sid: localStorage.getItem("id"),
    };
    const response = await fetch("/api/assignment/student/sendass", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const res = await response.json();
    console.log(res.body);
    getSpeAssignments();
    setMode(0);
  };

  const Mainbody = () => {
    if (mode === 0) {
      return (
        <>
          <h1>Welcome to assignment for course {courseId}</h1>
          <h2 className="py-2">Pending</h2>
          <PendingAss />
          <h2 className="py-2">Still Editable</h2>
          <StillEdit />
          <h2 className="py-2">Submitted</h2>
          <Submitted/>
          <h2 className="py-2">Overdue</h2>
          <Overdue />
        </>
      );
    } else if (mode === 1) {
      console.log(working);
      return (
        <>
          <form onSubmit={sendAws}>
            <div className="grid grid-cols-3 grid-rows-6">
              <div className="my-4 col-span-3">
                <h3 className=" ">Title : {"    " + working.topic}</h3>
              </div>
              <div className="my-4 flex row-span-2 col-span-3">
                <h3 className=""> Description : </h3>{" "}
                <p>&nbsp; {working.description}</p>
              </div>
              <div className="my-4 row-span-3 col-span-3">
                <h3 className="pb-2">Your answer</h3>
                <textarea
                  defaultValue={working.answer}
                  placeholder={working.answer}
                  rows={6}
                  id="answer"
                  name="answer"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <button className="bg-blue-500 text-white py-2 px-4 rounded">
                <p>Submit Assignment</p>
              </button>
            </div>
          </form>
        </>
      );
    } else if (mode === 2) {
      console.log(working);
      return (
        <>
   
            <div className="grid grid-cols-3 grid-rows-6">
              <div className="my-4 col-span-3">
                <h3 className=" ">Title : {"    " + working.topic}</h3>
              </div>
              <div className="my-4 flex row-span-2 col-span-3">
                <h3 className=""> Description : </h3>{" "}
                <p>&nbsp; {working.description}</p>
              </div>
              <div className="my-4 row-span-1 col-span-3">
                <h3 className="pb-2">Your answer:</h3>
                <p>{working.answer}</p>
              </div>
              <div className="my-4 col-span-3">
                <h3 className="pb-2">Feedback:</h3>
                <p>{working.comment}</p>
              </div>
            </div>

            <div>
              <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={()=>{setMode(0); getSpeAssignments()}}>
                <p>Back</p>
              </button>
            </div>
    
        </>
      );
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
