import { useEffect, useState } from "react";
import CourseElement from "../../../../../component/CourseElement";
import { Headerr } from "../../../../../component/headerr";
import Router, { useRouter } from "next/router";
import prisma from "../../../../../lib/prisma";
import { GetServerSideProps } from "next";
const Home: React.FC = ({
  assignment: {
    assignmentid,
    courseid,
    topic,
    description,
    fullscore,
    publishtime,
    duedate,
    courseId,
  },
}) => {
  const [errormes, setErrormes] = useState("");
  const [allasign, setAllassign] = useState([]);
  const [needknow, setNeedknow] = useState({
    max: "",
    maxn: 0,
    minn: 0,
    min: "",
    avg: 0,
    sd: 0,
    total:0,
    sure:0
  });
  const [working, setWorking] = useState({
    score: 0,
    answer: "",
    comment: "",
    sid: 0,
    sname: "",
  });
  const router = useRouter();

  const [mode, setMode] = useState(0); // mode 0 = default 1 = create

  useEffect(() => {
    getAllscore();
  }, []);

  useEffect(() => {
    logic();
  }, [allasign]);

  const logic = () => {
    let mx = 0,
      sure=0,
      mn = 1000,
      mnn = "",
      mxn = "",
      total = 0,
    
      num = 0,
      forsd = [];
    console.log("hi");
    allasign.forEach((element, i) => {
      if (i === 0) {
      } else {
        sure++
        if (element.status === 2) {
          if (element.score > mx) {
            (mx = element.score), (mxn = element.sname);
          }
          if (element.score < mn) {
            (mn = element.score), (mnn = element.sname);
          }
          total += element.score;
          num++;
          forsd.push(element.score);
        }
      }
    });
    const mean = total / num;
    let gafa = 0;
    if(mn===1000){mn = 0}
    forsd.forEach((element) => {
      gafa += Math.pow(element - mean, 2);
    });
    const SD = Math.sqrt(gafa / num);
    setNeedknow({
      max: mxn,
      min: mnn,
      maxn: mx,
      minn: mn,
      avg: mean,
      sd: SD,
      total:num,
      sure:sure
    });
  };
  const timeout = (time: any) => {
    window.setTimeout(() => {
      setErrormes("");
    }, time);
  };
  const getAllscore = async () => {
    const response = await fetch("/api/assignment/instructor/getass", {
      method: "POST",
      body: assignmentid,
    });
    const res = await response.json();
    console.log(res.body);
    setAllassign(res.body);
  };

  const sendGrade = async (e) => {
    e.preventDefault();
    const data = {
      assignid: assignmentid,
      score: e.target.score.value,
      comment: e.target.comment.value,
      sid: working.sid,
    };
    if (parseInt(data.score) > fullscore) {
      setErrormes("above");
      timeout(1000);
      return;
    }
    const response = await fetch("/api/assignment/instructor/sendgrade", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const res = await response.json();
    console.log(res.body);
    getAllscore();
    setMode(0);
  };

  const ShowErrorAdd = () => {
    if (errormes === "above") {
      return (
        <div className="mt-4 ml-4 text-red-600">
          <p>Your given score is above full score!</p>
        </div>
      );
    } else {
      return <div></div>;
    }
  };

  const Waitgrading = () => {
    const allsubmit = allasign.map((element, i) => {
      if (i === 0) {
        return (
          <>
            <div className="bg-purple-200 grid grid-cols-3 p-2 ">
              <p className="underline">Student ID</p>
              <p className="underline">Student Name</p>
              <p className="underline pl-3">Grade</p>
            </div>
          </>
        );
      } else {
        if (element.status === 1)
          return (
            <>
              <div className="bg-red-200 grid grid-cols-3 p-2 ">
                <p>{element.sid}</p>
                <p>{element.sname}</p>
                <p>
                  <button
                    className="bg-blue-500 text-white py-1 px-4 rounded"
                    onClick={() => {
                      setMode(1);
                      setWorking({
                        sid: element.sid,
                        score: element.score,
                        comment: element.comment,
                        answer: element.answer,
                        sname: element.sname,
                      });
                    }}
                  >
                    <p>Grade</p>
                  </button>
                </p>
              </div>
            </>
          );
        else {
          return <></>;
        }
      }
    });
    return <> {allsubmit}</>;
  };

  const Graded = () => {
    const allsubmit = allasign.map((element, i) => {
      if (i === 0) {
        return (
          <>
            <div className="bg-purple-200 grid grid-cols-4 p-2 ">
              <p className="underline">Student ID</p>
              <p className="underline">Student Name</p>
              <p className="underline">Grade</p>
              <p className="underline pl-3">Edit</p>
            </div>
          </>
        );
      } else {
        if (element.status === 2) {
          return (
            <>
              <div className="bg-green-200 grid grid-cols-4 p-2 ">
                <p>{element.sid}</p>
                <p>{element.sname}</p>
                <p>
                  {element.score}/{fullscore}
                </p>
                <p>
                  <button
                    className="bg-blue-500 text-white py-1 px-4 rounded"
                    onClick={() => {
                      setMode(1);
                      setWorking({
                        sid: element.sid,
                        score: element.score,
                        comment: element.comment,
                        answer: element.answer,
                        sname: element.sname,
                      });
                    }}
                  >
                    <p>Edit</p>
                  </button>
                </p>
              </div>
            </>
          );
        } else {
          return <></>;
        }
      }
    });

    return <> {allsubmit}</>;
  };

  const Main = () => {
    if (mode === 0) {
      return (
        <>
          <h2 className="py-2">Await grading</h2>
          <Waitgrading />
          <h2 className="py-2">Graded</h2>
          <Graded />
          <h1 className="py-2">Course Statistics</h1>
          <div className="p-2 bg-blue-200 rounded-b-xl ">
            <p>
              Submitted : {needknow.total} From : {needknow.sure}
            </p>
            <p>
              Max Score : {needknow.maxn} By : {needknow.max}{" "}
            </p>
            <p>
              Min Score : {needknow.minn} By : {needknow.min}{" "}
            </p>
            <p>
              Average Score is : {needknow.avg} And SD is : {needknow.sd.toFixed(3)}{" "}
            </p>
          </div>
        </>
      );
    } else if (mode === 1) {
      return (
        <>
          <form onSubmit={sendGrade}>
            <div className="grid grid-cols-3 grid-rows-5 ">
              <div className="my-4">
                <label>Student ID : {"    " + working.sid}</label>
              </div>
              <div className="my-4 col-span-2">
                <label className=""> Student Name : {working.sname}</label>
              </div>
              <div className="my-4 row-span-2 col-span-3">
                <label className="pb-2">Their Answer :</label>
                <p>{working.answer}</p>
              </div>
            </div>
            <div className="col-span-3">
              <label className="block my-2 text-sm font-medium text-gray-900 ">
                Score (Full Score: {fullscore})
              </label>
              <input
                required
                type="number"
                placeholder={working.score}
                id="score"
                name="score"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="col-span-3">
              <label className="block my-2 text-sm font-medium text-gray-900 ">
                Comment
              </label>
              <input
                type="text"
                id="comment"
                name="comment"
                placeholder={working.comment}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>

            <div className="flex item-center">
              <button className="bg-blue-500 mt-2 text-white py-2 px-4 rounded">
                <p>Grade</p>
              </button>
              <ShowErrorAdd />
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
        <div className="grid pb-2 grid-cols-3">
          <h1 className="">Assignment Topic: {topic}</h1>{" "}
          <h1>Publish Date: {publishtime.substring(0, 10)}</h1>
          <h3>Due Date: {duedate.substring(0, 10)}</h3>
        </div>
        <p>Description: {description}</p>
        <Main />
      </div>
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const courseId = Number(
    Array.isArray(context.params.id) ? context.params.id[0] : context.params.id
  );
  const assId = Number(
    Array.isArray(context.params.assignid)
      ? context.params.assignid[0]
      : context.params.assignid
  );
  //console.log(assId, '     ddddddddddd')
  const allAss = await prisma.Assignment.findUnique({
    where: { assignmentid: assId },
  });

  return {
    props: {
      assignment: {
        ...JSON.parse(JSON.stringify(allAss)),
        courseId: courseId,
      },
    },
  };
};

export default Home;
