import { Bodyy } from "../component/bodyy";
import {  Headerr } from "../component/headerr";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className="bg-bgcolor w-screen h-screen">
      <Headerr/>
      <Bodyy/>
    </div>
  );
}
