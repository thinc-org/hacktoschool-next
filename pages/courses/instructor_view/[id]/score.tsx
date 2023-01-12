import { GetServerSideProps } from "next";
import Router from "next/router";
import { useEffect, useState } from "react";
import { Headerr } from "../../../../component/headerr";
import prisma from "../../../../lib/prisma";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

const CourseMenu: React.FC = ({
  course: { id: courseId, title, description, instructor_name, imagePath },
}) => {
  // for some loading
  const [labelshow, setLabelshow] = useState([]);
  const [scoreshow, setScoreshow] = useState([]);
  const [bgshow, setBgshow] = useState([]);

  const [needknow, setNeedknow] = useState({
    avgscore: 0,
    totalfullscore: 0,
  });
  const [bordershow, setBordershow] = useState([]);
  useEffect(() => {
    getScore();
  }, []);
  const getScore = async () => {
    let scoretag = [];
    let studenttag = [];
    let fulltag = [];
    let percenttag = [];
    let bgtag = [];
    let totals = 0;
    let totalf = 0;

    const response = await fetch("/api/enroll/gets", {
      method: "POST",
      body: courseId,
    });
    const res = await response.json();
    //console.log(res.body , ' allstudent')
    for (let element of res.body) {
      const data = {
        cid: courseId,
        sid: element.studentId,
      };
      const allscore = await fetch("/api/assignment/student/getallwithid", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const realall = await allscore.json();
      let temp = 0;
      let full = 0;

      realall.body.forEach((element2) => {
        if (element2.status === 2) {
          temp += element2.score;
          full += element2.fullscore;
        }
      });
      if (full !== 0) {
        const ss = (temp / full) * 100;
        studenttag.push(element.sname);
        fulltag.push(full), percenttag.push(ss);
        if (ss >= 50) {
          bgtag.push("rgb(74 222 128)");
        } else {
          bgtag.push("rgb(248 113 113)");
        }
      }
      

      scoretag.push(temp);
      
      
      
    }
    console.log(studenttag)
    //console.log(percenttag);
    //  console.log(fulltag)
    //  console.log(scoretag)
    const sumscore = scoretag.reduce((partialSum, a) => partialSum + a, 0);
    const sumfscore = fulltag.reduce((partialSum, a) => partialSum + a, 0);
    setNeedknow({
      avgscore: (sumscore / sumfscore) * 100,
      totalfullscore: 0,
    });
    setLabelshow(studenttag);
    setScoreshow(percenttag);
    setBgshow(bgtag);

    // setScoreshow(scoretag);
    // setBgshow(bgtag);
    // console.log(bordertag);
    // setBordershow(bordertag);
  };

  const option = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          font: {
            size: 14,
          },
        },
      },
      y: {
        max: 100,
        min: 0,
      },
    },
  };
  const data = {
    labels: labelshow,
    datasets: [
      {
        label: "Score Percentage",
        data: scoreshow,
        barPercentage: 0.5,
        backgroundColor: bgshow,
        borderColor: bordershow,

        hoverBackgroundColor: bgshow,
        borderWidth: 2,
      },
    ],
  };

  return (
    <>
      <Headerr />
      <div className="pt-10 px-48">
        <h1>
          Graph for student score for all the assignment in this course in
          percentage
        </h1>
        <div className="flex justify-center">
          <div className=" h-[30rem] w-[50rem]">
            <Bar data={data} options={option} />
          </div>
        </div>
        <div className="mt-3">
          <p>
            Average Score For Students In This Course :{" "}
            {needknow.avgscore.toFixed(2)}
          </p>
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
