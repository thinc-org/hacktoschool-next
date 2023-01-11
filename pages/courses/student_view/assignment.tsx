import { useEffect, useState } from "react";
import CourseElement from "../../../component/CourseElement";
import { Headerr } from "../../../component/headerr";
import Router, { useRouter } from "next/router";
export default function Home() {
 const router = useRouter()
 const [pendings, setPendingas] = useState([])
 useEffect(()=>{
  getAllassignments()
 },[])

 const getAllassignments=async()=>{
    const response = await fetch('/api/assignment/student/getall',{
      method:'POST',
      body: localStorage.getItem('id')
    })
    const res = await response.json()
    console.log(res.body)
    setPendingas(res.body)
 }
 const PendingAss = ()=>{
  console.log(pendings)
  const pending = pendings.map((element,i)=>{
    if(i===0){
      return(
        <>
        <div className="bg-purple-200 grid grid-cols-5 py-3">
          <p>Topic</p>
          <p>Course ID</p>
          <p>Full Score</p>
          <p>Due Date</p>
        </div>
        </>)
    }
    else{
    return(
    <>
    <div className="bg-blue-200 grid grid-cols-5">
      <p>{element.topic}</p>
      <p>{element.courseid}</p>
      <p>{element.fullscore}</p>
      <p>{element.duedate.substring(0,10)}</p>
      <div><button onClick={()=>{router.push(`/courses/student_view/${element.courseid}/assign`)}} className="bg-blue-500 text-white py-1 px-4 rounded">Check</button></div>
    </div>
    </>)}
  })
  return <>{pending}</>
 }

 


  return (
    <>
      <Headerr />
      <div className="pt-10 px-48">
        <h1>Welcome to student Assignment</h1>
        <PendingAss/>
      </div>
     
    </>
  );
}
