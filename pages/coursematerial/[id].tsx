import { GetServerSideProps } from "next";
import Router from "next/router";
import { useEffect, useState } from "react";
import { Headerr } from "../../component/headerr";
import prisma from "../../lib/prisma";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullhorn,
  faComment,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { faThumbsUp as anotherFaThumb } from "@fortawesome/free-regular-svg-icons";
import { useRouter } from "next/router";

const CourseMenu: React.FC = ({ course: { courseId: courseId } }) => {
  // for some loading
  const [role, setRole] = useState("")
  const [mode, setMode] = useState(0);
  const [allmat, setAllmat] = useState([]);

  useEffect(() => {
    //adding font awesome
    // for some future features
    setRole(localStorage.getItem("role"))
    getMat()
  }, []);
  const CreateMat = ()=>{
    if(role === 'instructor'){
        return<><button className="px-4 py-2 rounded-full bg-blue-200" onClick={()=>{setMode(1)}}><p>New Course Material</p></button></>
    }
    else{
        return <></>
    }
  }
  const getMat = async ()=>{
    const nana = {
      
        cid: courseId,
        
        
      };
      const response = await fetch("/api/coursemat/getall", {
        method: "POST",
        body: JSON.stringify(nana),
      });
      const res = await response.json();
      console.log(res.body);
      setAllmat(res.body)
  }

  const Allmat =()=>{
   const gg= allmat.map((element)=>{
        return(
            <div className="p-4 my-2 bg-gradient-to-r to-green-200 from-yellow-200">
            <p>Name : {element.name}</p>
            <p>Description : {element.des}</p>
            <div className="flex in-line"><p className="">Link : <span className="bg-white px-2 rounded-full"><a href={element.material} target="_blank" rel="noopener noreferrer">{element.material}</a></span></p></div>
            </div>
        )
    })
    return<>{gg}</>
  }

  const sendMat = async (e) =>{
    e.preventDefault();
    const nana = {
        title: e.target.title.value,
        des: e.target.descrip.value,
        cid: courseId,
        id: localStorage.getItem("id"),
        link:e.target.link.value
        
      };
      const response = await fetch("/api/coursemat/create", {
        method: "POST",
        body: JSON.stringify(nana),
      });
      const res = await response.json();
      console.log(res.body);
      setMode(0)
      getMat()
  

  }
  const Mainbody = ()=>{
    if(mode === 0){
        return(
            <> 
            <Allmat/>
             <CreateMat/>
            
            </>
        )
    

    }
    else{
        return(<>
         <form onSubmit={sendMat}>
            <div className="grid grid-cols-3 grid-rows-4">
              <div className="my-4 col-span-3">
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
              <div className="my-4 row-span-2 col-span-3">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Description
                </label>
                <textarea
                  required
                  rows={6}
                  id="descrip"
                  name="descrip"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="my-4 col-span-3">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Material Link
                </label>
                <input
                  required
                  type="text"
                  id="link"
                  name="link"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <button className="bg-blue-500 text-white py-2 px-4 rounded">
                  <p>Create Discussion</p>
                </button>
              </div>
              <div></div>
              <div className="pl-5">
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded"
                  type="button"
                  onClick={() => {
                    setMode(0);
                  }}
                >
                  <p>Back</p>
                </button>
              </div>
            </div>
          </form></>)
    }
  }
  
  return (
    <>
      <Headerr />
      <div className="pt-10 px-48">
        <h1>Welcome To Course Material For This Course</h1>
        <Mainbody/>
       
      </div>
    </>
  );
};

// this function will check for
// course details, instructor_name
export const getServerSideProps: GetServerSideProps = async (context) => {
  const courseId = Number(
    Array.isArray(context.params.id) ? context.params.id[0] : context.params.id
  );

  //find all announcements for this class
  const announcements = await prisma.announcement.findMany({
    where: {
      courseId: courseId,
    },
  });

  return {
    props: {
      course: {
        courseId,
      },
      announcements: announcements,
    },
  };
};

export default CourseMenu;
