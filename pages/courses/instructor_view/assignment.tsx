import { useEffect, useState } from "react";
import CourseElement from "../../../component/CourseElement";
import { Headerr } from "../../../component/headerr";
import Router, { useRouter } from "next/router";
export default function Home() {
 const router = useRouter()
 

 


  return (
    <>
      <Headerr />
      <div className="pt-10 px-48">
        <h1>Welcome to instructor Assignment</h1>
      </div>
     
    </>
  );
}
