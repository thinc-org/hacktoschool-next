
import {Headerr} from "../../component/headerr"
import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [errormes, setErrormes] = useState("");
  const timeout = (time: any) => {
    window.setTimeout(() => {
      setErrormes("");
    }, time);
  };

  const createCourse =async (e)=>{
    e.preventDefault();
    const go ={
      title: e.target.title.value,
      description: e.target.descrip.value,
      Id: localStorage.getItem('id')
    }
    const response = await fetch('/api/course',{
      method:'POST',
      body: JSON.stringify(go)
    })
    const now = await response.json()
    if(response.status === 500){
      setErrormes("Already");
      timeout(3000);
    }
    else{
      setErrormes("Done");
      timeout(3000);
    }
    console.log(now)

  }

  const ShowErrorAdd = () => {
    if (errormes === "Already") {
      return (
        <div className="mt-6 text-red-600">
          <p>This title is already taken!</p>
        </div>
      );
    } else if (errormes === "Done") {
      return (
        <div className="mt-6 text-green-600">
          <p>Created!</p>
        </div>
      );
    } 
   else {
      return <div></div>;
    }
  };

  return (
    <div className="bg-bgcolor w-screen h-screen">
      <Headerr  />
      <form className="mt-24 pr-20 px-40" onSubmit={createCourse}>
            <div className="my-4">
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Title
              </label>
              <input
                required
                type="text"
                id="title"
                name="title"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="my-4">
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Description
              </label>
              <input
                required
                type="text"
                id="descrip"
                name="descrip"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
      
     
            <button className="bg-blue-500 text-white py-2 px-4 rounded">
              <p>Create Course</p>
            </button>
            <div>
              <ShowErrorAdd />
            </div>
          </form>
    </div>
  );
}