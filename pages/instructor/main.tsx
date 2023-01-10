import { useEffect, useState } from "react";
import CourseElement from "../../component/CourseElement";
import { Headerr } from "../../component/headerr";
import Router, { useRouter } from "next/router";
export default function Home() {
 const router = useRouter()
  const [allcourse, setAllcourse] = useState([]);
  useEffect(() => {
    getAllCourse();
  }, []);

  const getAllCourse = async () => {
    const response = await fetch("/api/instructor/allcourse", {
      method: "POST",
      body: localStorage.getItem("id"),
    });
    const res = await response.json();
    console.log(res);
    setAllcourse(res.body);
  };

  const onClickHandler = (courseId) => {
    Router.push('/courses/[id]', `/courses/${courseId}`);
}


  return (
    <>
      <Headerr />
      <div className="pt-10 px-48">
        <h1 className="text-2xl mb-5">Your Courses</h1>
        {allcourse.map((course) => (
          <div className="border-solid rounded-3xl bg-gradient-to-r from-green-300 hover:scale-105 border-2 border-black my-5   " key={course.id}
          onClick={()=>onClickHandler(course.id)}>
            <CourseElement course={course} />
          </div>
        ))}
         <button className='bg-blue-500  text-white py-3 px-4 rounded' onClick={()=>{
            router.push('/instructor/createcourse')
         }} >GOOOOO</button>
      </div>
     
    </>
  );
}
