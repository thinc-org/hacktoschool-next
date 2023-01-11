import { useEffect, useState } from "react";
import CourseElement from "../../../component/CourseElement";
import { Headerr } from "../../../component/headerr";
import Router, { useRouter } from "next/router";
export default function Home() {
  const router = useRouter();
  const [pendings, setPendingas] = useState([]);
  useEffect(() => {
    getAllassignments();
  }, []);

  const getAllassignments = async () => {
    const response = await fetch("/api/assignment/student/getall", {
      method: "POST",
      body: localStorage.getItem("id"),
    });
    const res = await response.json();
    console.log(res.body);
    setPendingas(res.body);
  };
  const PendingAss = () => {
  

    const pending = pendings.map((element, i) => {
      if (i === 0) {
        return (
          <>
            <div className="bg-purple-200 grid grid-cols-6 p-3">
              <p>Assignment Topic</p>
              <p>Course Name</p>
              <p>Full Score</p>
              <p>Publish Date</p>
              <p>Due Date</p>
            </div>
          </>
        );
      } else {
        const today = new Date();
        const ddate = new Date(element.duedate);
        const pdate = new Date(element.publish);
        if (ddate >= today && today >= pdate) {
          return (
            <>
              {/* .substring(0,10) */}
              <div className="overflow-hidden bg-blue-200 grid grid-cols-6  px-3 py-1">
                <p>{element.topic}</p>
                <p>{element.coursename}</p>
                <p>{element.fullscore}</p>
                <p>{element.publish.substring(0, 10)}</p>
                <p>{element.duedate.substring(0, 10)}</p>
                <div>
                  <button
                    onClick={() => {
                      router.push(
                        `/courses/student_view/${element.courseid}/assign`
                      );
                    }}
                    className="bg-blue-500 text-white py-1 px-4 rounded"
                  >
                    Check
                  </button>
                </div>
              </div>
            </>
          );
        } else {
          return;
          <></>;
        }
      }
    });
    return <>{pending}</>;
  };

  const OverduegAss = () => {
   

    const pending = pendings.map((element, i) => {
      if (i === 0) {
        return (
          <>
            <div className="bg-purple-200 grid grid-cols-6 p-3">
              <p>Assignment Topic</p>
              <p>Course Name</p>
              <p>Full Score</p>
              <p>Publish Date</p>
              <p>Due Date</p>
            </div>
          </>
        );
      } else {
        const today = new Date();
        const ddate = new Date(element.duedate);
        const pdate = new Date(element.publish);
        console.log(today - ddate)
        if (today >= ddate && (today-ddate<691200000)) {
          return (
            <>
              {/* .substring(0,10) */}
              <div className="overflow-hidden bg-blue-200 grid grid-cols-6 px-3 py-1">
                <p>{element.topic}</p>
                <p>{element.coursename}</p>
                <p>{element.fullscore}</p>
                <p>{element.publish.substring(0, 10)}</p>
                <p>{element.duedate.substring(0, 10)}</p>
                <div>
                  <button
                    onClick={() => {
                      router.push(
                        `/courses/student_view/${element.courseid}/assign`
                      );
                    }}
                    className="bg-blue-500 text-white py-1 px-4 rounded"
                  >
                    Check
                  </button>
                </div>
              </div>
            </>
          );
        } else {
          return;
          <></>;
        }
      }
    });
    return <>{pending}</>;
  };

  return (
    <>
      <Headerr />
      <div className="pt-10 px-48">
        <h1>Welcome to student Assignment</h1>
        <h2 className="py-3">Pending Assignment</h2>
        <PendingAss />
        <h2 className="py-3">Overdue Assignment</h2>
        <OverduegAss/>
      </div>
    </>
  );
}
