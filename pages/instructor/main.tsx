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
    Router.push('/courses/instructor_view/[id]', `/courses/instructor_view/${courseId}`);
}


  return (
    <>
      <Headerr />
      <div className="pt-10 px-48">
        <h1 className="text-2xl mb-5">Your Courses</h1>
        {allcourse.map(course => (
                        <div className="border-solid rounded-3xl bg-white hover:scale-105 hover:border-2 hover:border-yellow-400 my-5
                        grid grid-cols-2 grid-rows-1 overflow-x-hidden   " key={course.id}>
                           <div className=""><img className="object-fill w-[10rem] h-[10rem]" src={course.imagePath} /></div>
                           <div><CourseElement course={course} />
                           <div className=" mx-5"><button  onClick = {() => onClickHandler(course.id)} className="bg-green-300 text-white rounded-3xl"><p className="px-4 py-1">Check Details</p></button></div>
                           </div>
                       </div>
                    ))}
         <button className='bg-courseBtnBgColor text-white py-3 px-4 rounded-full my-5' onClick={()=>{
            router.push('/instructor/createcourse')
         }} >Create Course</button>
      </div>
     
    </>
  );
}
