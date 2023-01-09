import { Bodyy } from "../component/bodyy";
import {  Headerr } from "../component/headerr";
import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [statemain, setStatemain] = useState("main");
  const selectState =(data:string)=>{
      setStatemain(data)

  }
  return (
    <div className="bg-bgcolor w-screen h-screen">
      <Headerr selectState={selectState}/>
      <Bodyy statemain={statemain}/>
    </div>
  );
}