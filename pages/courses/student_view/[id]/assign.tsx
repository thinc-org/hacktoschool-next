import { useEffect, useState } from "react";
import CourseElement from "../../../../component/CourseElement";
import { Headerr } from "../../../../component/headerr";
import Router, { useRouter } from "next/router";
import prisma from "../../../../lib/prisma";
import { GetServerSideProps } from "next";
const Home: React.FC = ({
  course: { id: courseId, title, description, instructor_name, imagePath },
}) => {

  const [mode,setMode] = useState(0)
  const [assign,setAssign] = useState([])
  const[working,setWorking] = useState({
    assignmentid:0,
    topic:'',
    description:''
  }) //set assignment id that working on
  useEffect(()=>{
    getSpeAssignments()
  },[])

  const getSpeAssignments= async ()=>{
    const response = await fetch('/api/assignment/student/getallwithid',{
      method:'POST',
      body:courseId
    })
    const res = await response.json()
    console.log(res.body)
    setAssign(res.body)
  }

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
        const pdate = new Date(element.publishtime);
        if (ddate >= today && today >= pdate) {
          return (
            <>
              {/* .substring(0,10) */}
              <div className="overflow-hidden bg-blue-200 grid grid-cols-5  px-3 py-1">
                <p>{element.topic}</p>
                <p>{element.fullscore}</p>
                <p>{element.publishtime.substring(0, 10)}</p>
                <p>{element.duedate.substring(0, 10)}</p>
                <div><button className="bg-blue-500 text-white py-1 px-4 rounded" onClick={()=>{setMode(1) 
                  setWorking({
                    assignmentid:element.assignmentid,topic:element.topic,description:element.description
                  })}}><p>Submit</p></button></div>
                
              </div>
            </>
          );
        }
      }
    });
    return <>{pending}</>;
  };

  const sendAws=async(e)=>{
    e.preventDefault();
    const data ={
      assignid:working.assignmentid,
      answer: e.target.answer.value,
      sid: localStorage.getItem('id')
    }
    const response = await fetch("/api/assignment/student/sendass", {
      method: "POST",
      body: JSON.stringify(data),
    });

    const res = await response.json()
    console.log(res.body)
    
    setMode(0)

  }

  const Mainbody=()=>{
    if(mode === 0){
      return(
        <>
         <h1>Welcome to assignment only course for student</h1>
        <h2>Pending</h2>
        <PendingAss/>
        <h2>Still Editable</h2>
        <h2>Submitted</h2>
        <h2>Overdue</h2>
        </>
      )
    }
    else if (mode === 1){
      console.log(working)
     return(
      <>
      <form onSubmit={sendAws}>
      <div className="grid grid-cols-3 grid-rows-6">
              <div className="my-4 col-span-3">
                <h3 className=" ">
                  Title : {'    '+working.topic}
                </h3>
              </div>
              <div className="my-4 flex row-span-2 col-span-3">
                <h3 className=""> Description : </h3> <p>&nbsp;  { working.description}</p>
              </div>
              <div className="my-4 row-span-3 col-span-3">
                <h3 className="pb-2">Your answer</h3>
               <textarea
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
     )

    } else {
      return;
      <></>;
    }
   
  }

 

  return (
    <>
      <Headerr />
      <div className="pt-10 px-48">
      <Mainbody/>
       
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
