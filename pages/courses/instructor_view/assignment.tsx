import { useEffect, useState } from "react";
import CourseElement from "../../../component/CourseElement";
import { Headerr } from "../../../component/headerr";
import Router, { useRouter } from "next/router";
export default function Home() {
 const router = useRouter()
 const [mode,setMode] = useState(0) // mode 0 = default 1 = create

  const Mainbody=()=>{
    if(mode === 0){
      return(
        <>
         <h1>Welcome to instructor Assignment</h1>
        <h1>Ongoing Assignment</h1>
        <h1>Finished Assignment</h1>
        <h1>Waitting Assignment</h1>
        <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={()=>{setMode(1)}}><h1>Create Assignment</h1></button>

        </>
      )
    }
    else if(mode === 1){
      return(
        <>
        <h1>Create Course</h1>
      <form>
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
        <div className="my-4">
          <label className="block mb-2 text-sm font-medium text-gray-900 ">
            Publish Date
          </label>
          <input
            required
            type="date"
            id="descrip"
            name="descrip"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="my-4">
          <label className="block mb-2 text-sm font-medium text-gray-900 ">
            Due date
          </label>
          <input
            required
            type="date"
            id="descrip"
            name="descrip"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <button className="bg-blue-500 text-white py-2 px-4 rounded">
          <p>Create Course</p>
        </button>

      </form>
      </>
      )
    }
    else{
      return <></>
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
}
