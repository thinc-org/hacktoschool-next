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
    totalscore: 0,
    totalfullscore: 0,
  });
  const [bordershow, setBordershow] = useState([]);
  useEffect(() => {
    getScore()
  }, []);
  const getScore = async () => {
    let labeltag = [];
    let scoretag = [];
    let bgtag = [];
    let bordertag = [];
    let totals = 0;
    let totalf = 0;

    const response = await fetch("/api/enroll/gets", {
      method: "POST",
      body: courseId,
    });
    const res = await response.json();
    //console.log(res.body , ' allstudent')
    for(let element of res.body){
      const data={
        cid:courseId,
        sid:element.studentId
      }
      const allscore = await fetch('/api/assignment/student/getallwithid',{
        method:'POST',
        body:JSON.stringify(data)
      })
      const realall = await allscore.json()
      let temp = []
      
      realall.body.forEach((element2) => {
        if(element2.status === 2){
            temp.push(element2)
        }
      });
      scoretag.push(element.studentId)
      labeltag.push(temp)
     
      }
    
    console.log(labeltag)
    console.log(scoretag)
    // setLabelshow(labeltag);
    // setNeedknow({
    //   totalscore: totals,
    //   totalfullscore: totalf,
    // });
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
            size: 18,
          },
        },
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
        <h1 style={{ color: "red" }}>FOR DEBUGGING : USNXSNDJD</h1>
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
