import { GetServerSideProps } from "next";
import Router from "next/router";
import { useEffect, useState } from "react";
import { Headerr } from "../../component/headerr";
import prisma from "../../lib/prisma";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBullhorn } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";

const CourseMenu: React.FC = ({
  course: { courseId: courseId}
}) => {
  // for some loading

  const [mode, setMode] = useState(0)
  const [alldis,setAlldis] = useState([])

  useEffect(() => {
    //adding font awesome
    // for some future features
    getAllDis()
   
  }, []);
  const getAllDis = async()=>{
    const res = await fetch('/api/discussion/getall',{
        method:'POST',
        body: courseId
    })
    const alldis = await res.json()
    setAlldis(alldis.body)

  }

  const sentNewDis = async (e: { preventDefault: () => void; target: { title: { value: any; }; descrip: { value: any; }; pdate: { value: any; }; ddate: { value: any; }; full: { value: any; }; }; }) => {
    e.preventDefault();
    
    const newAn = {
      title: e.target.title.value,
      des: e.target.descrip.value,
      cid: courseId,
      id: localStorage.getItem("id"),
      role: localStorage.getItem('role')
    };
   

    const response = await fetch("/api/discussion/new", {
      method: "POST",
      body: JSON.stringify(newAn),
    });
    const res = await response.json();
    console.log(res.body + "  dddddd");
    setMode(0);
    getAllDis()
  };

  const Discussbidy=()=>{
    const I = alldis.map((element)=>{
        return(<>
        <div className=" hover:scale-110  m-5 my-5 p-3 bg-gradient-to-r to-sky-200 from-emerald-200 ">
        <div className="flex justify-center">
        <h1 className="text-xl">{element.topic}</h1>
        </div>
        <p className="text-sm">Wrote By : {element.name}</p>
        <p className="text-xs my-2">{element.detail}</p>
        <p className="text-sm">Like: {element.like}</p>
        </div>
        </>)
    })
    return<>{I}</>
  }

  const Mainbody = () => {
    if (mode === 0) {
      return (
        <>
        <Discussbidy/>
        <h1 className="">Create Discussion</h1>
        <button className="bg-blue-500 text-white py-2 px-4 rounded" type='button' onClick={()=>{setMode(1)}}><p>Go</p></button>
        </>
      );
    } else if (mode === 1) {
      return (
        <>
          <h1>Create Discussion</h1>
          <form onSubmit={sentNewDis}>
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
              <div>
                <button className="bg-blue-500 text-white py-2 px-4 rounded" >
                  <p>Create Discussion</p>
                </button>
            
              </div>
              <div>

              </div>
              <div className="pl-5">
                <button className="bg-blue-500 text-white py-2 px-4 rounded" type='button' onClick={()=>{setMode(0)}}><p>Back</p></button>
              </div>
              
            </div>
          </form>
        </>
      );
    } else {return<></>}
}

 



  return (
    <>
     
      <Headerr />
      <div className="pt-10 px-48">
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
      courseId: courseId
    },
  });

  return {
    props: {
      course: {
        courseId
      },
      announcements: announcements
    },
  };
};

export default CourseMenu;
