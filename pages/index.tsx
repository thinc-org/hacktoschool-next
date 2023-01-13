import { Bodyy } from "../component/bodyy";
import {  Headerr } from "../component/headerr";
import { useState } from "react";

import styles from "../styles/Home.module.css";
import Router, { useRouter } from "next/router";

export default function Home() {
  const [statemain, setStatemain] = useState("main");
  const selectState =(data:string)=>{
      setStatemain(data)
  }
  const router = useRouter() 
  return (
    <div className="bg-bgcolor w-screen h-screen">
      <div className="invisible lg:visible"><Headerr selectState={selectState}/></div>
      <div className="pl-40 visible lg:invisible"><button onClick={()=>{router.push('/moblie')}} className="px-4 py-2 bg-blue-300"><h1>Menu</h1></button></div>
      <Bodyy statemain={statemain}/>
    </div>
  );
}