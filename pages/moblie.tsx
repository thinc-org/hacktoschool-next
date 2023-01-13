import { Bodyy } from "../component/bodyy";
import {  Headerr } from "../component/headerr";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";

export default function Home() {
  const [statemain, setStatemain] = useState("main");
  const selectState =(data:string)=>{
      setStatemain(data)
  }
  const router = useRouter() 
  return (
    <div className="bg-bgcolor w-screen h-screen">
      <div className=" border-solid border-black border-y-2 mt-10 pt-10 pb-10 relative flex items-center"><button className=" ml-10 px-4 py-2 bg-blue-300" onClick={()=>{router.push('/')}}><h1>Back</h1></button>
        <h1 className="absolute left-[30%] text-3xl">GlobalTalk</h1>
        <h1 className=" text-xl text-gray-500 absolute left-[80%]">User</h1>
        <div className="rounded-full h-10 w-10 bg-black absolute left-[90%]"></div>
        </div>
      <div className="pl-40 pt-20 relative visible lg:invisible w-full h-full">
       
        <div className="absolute top-[30%] left-[30%]  w-[20rem] h-[20rem] content-center grid grid-cols-1 grid-rows-3">
            <h1  className="text-5xl text-gray-500">Sign Up</h1>
            <h1 className="text-5xl text-gray-500">Log In</h1>
            <h1 className="text-5xl text-gray-500" onClick={()=>{router.push('/courses')}}>Browse Courses</h1>
        </div>
      
      
      </div>
      
    </div>
  );
}