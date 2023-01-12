import { useEffect, useState } from "react";
import CourseElement from "../../../../component/CourseElement";
import { Headerr } from "../../../../component/headerr";
import Router, { useRouter } from "next/router";
import prisma from "../../../../lib/prisma";
import { GetServerSideProps } from "next";
const Home: React.FC = ({
  course: { id: courseId, title, description, instructor_name, imagePath },
}) => {
 
  const [allasign, setAllassign] = useState([]);
  const [errormes, setErrormes] = useState("");
  const router = useRouter();
  const [mode, setMode] = useState(0); // mode 0 = default 1 = create
  const [annoucement, setassignment] = useState({
    title: "",
    description: "",
    pdate: "",
    duedate: "",
    fullscore: 0,
    aid:0
  });
  const timeout = (time: any) => {
    window.setTimeout(() => {
      setErrormes("");
    }, time);
  };

  useEffect(() => {
    getAllassign();
  }, [mode]);

  const getAllassign = async () => {
    const nes = {
      courseid: courseId,
      instructorid: localStorage.getItem("id"),
    };

    const response = await fetch("/api/assignment/instructor/getall", {
      method: "POST",
      body: JSON.stringify(nes),
    });
    const res = await response.json();
    console.log(res.body);
    setAllassign(res.body);
  };

  const sentNewAssign = async (e: { preventDefault: () => void; target: { title: { value: any; }; descrip: { value: any; }; pdate: { value: any; }; ddate: { value: any; }; full: { value: any; }; }; }) => {
    e.preventDefault();
    
    const newAn = {
      title: e.target.title.value,
      des: e.target.descrip.value,
      pdate: e.target.pdate.value,
      ddate: e.target.ddate.value,
      full: e.target.full.value,
      courseid: courseId,
      instructorid: localStorage.getItem("id"),
    };
    if(newAn.pdate>newAn.ddate){
      setErrormes('nodate')
      timeout(1000)
      return
    }

    const response = await fetch("/api/assignment/instructor/new", {
      method: "POST",
      body: JSON.stringify(newAn),
    });
    const res = await response.json();
    console.log(res.body + "  dddddd");
    setMode(0);
  };

  const ShowErrorAdd = () => {
    if (errormes === "nodate") {
      return (
        <div className="mt-8 text-red-600">
          <p>Invalid Publish and Due Date!</p>
        </div>
      );
    } else {
      return <div></div>;
    }
  };

  const Finished = ()=>{
    
    const today = new Date();
  
    const nowna = allasign.map((asign,i) => {
      const ddate = new Date(asign.duedate)
      const pdate = new Date(asign.publishtime)
      // console.log(typeof(hi))
      // console.log("now: ", today);
      // console.log("due date: ", hi);
      // console.log(hi > today, " fffffff");
      if(i===0){  
        return<>
            <div className="bg-purple-200 grid grid-cols-5 p-2 ">
              <p className="underline">Topic</p>
              <p className="underline">Full Score</p>
              <p className="underline">Details</p>
              <p className="underline pl-3">Edit</p>
              <p className="underline pl-3">Delete</p>
            </div>
        </>
      }
      else{
      if (ddate < today ) {
        return (
          <>
            <div className="grid grid-cols-5 bg-red-200 p-2">
              <p className=" overflow-hidden">{asign.topic}</p>
              <p>{asign.fullscore}</p>
              <div><button className="bg-blue-500 text-white py-1 px-4 rounded" onClick={()=>{router.push(`/courses/instructor_view/${courseId}/assign/${asign.assignmentid}`)}}>Details</button></div>
              <div><button className="bg-blue-500 text-white py-1 px-4 rounded" onClick={()=>{setMode(2)
              setassignment({
                title:asign.topic,
                description:asign.description,
                duedate:asign.duedate,
                pdate:asign.publishtime,
                fullscore:asign.fullscore,
                aid:asign.assignmentid

              })
              }}>Edit</button></div>
              <div><button className="bg-blue-500 text-white py-1 px-4 rounded" onClick={async ()=>{
                const nomore = await fetch('/api/assignment/instructor/getass',{
                  method:"DELETE",
                  body:asign.assignmentid
                })
                const res = await nomore.json()
                console.log(res.body)
                getAllassign()

              }}>Delete</button></div>
            </div>
          </>
        );
      } else {
        return <></>;
      }}
    });
    return <>{nowna}</>;
  }

  const Waiting=()=>{
    
    const today = new Date();
  
    const nowna = allasign.map((asign,i) => {
      const ddate = new Date(asign.duedate)
      const pdate = new Date(asign.publishtime)
      // console.log(typeof(hi))
      // console.log("now: ", today);
      // console.log("due date: ", hi);
      // console.log(hi > today, " fffffff");
      if(i===0){
        return<>
            <div className="bg-purple-200 grid grid-cols-5 p-2 ">
              <p className="underline">Topic</p>
              <p className="underline">Full Score</p>
              <p className="underline">Details</p>
              <p className="underline pl-3">Edit</p>
              <p className="underline pl-3">Delete</p>
            </div>
        </>
      }else{
      if (today < pdate) {
        return (
          <>
            <div className="grid grid-cols-5 bg-yellow-200 p-2">
              <p className=" overflow-hidden">{asign.topic}</p>
              <p>{asign.fullscore}</p>
              <div><button className="bg-blue-500 text-white py-1 px-4 rounded" onClick={()=>{router.push(`/courses/instructor_view/${courseId}/assign/${asign.assignmentid}`)}}>Details</button></div>
              <div><button className="bg-blue-500 text-white py-1 px-4 rounded" onClick={()=>{setMode(2)
              setassignment({
                title:asign.topic,
                description:asign.description,
                duedate:asign.duedate,
                pdate:asign.publishtime,
                fullscore:asign.fullscore,
                aid:asign.assignmentid

              })
              }}>Edit</button></div>
              <div><button className="bg-blue-500 text-white py-1 px-4 rounded" onClick={async ()=>{
                const nomore = await fetch('/api/assignment/instructor/getass',{
                  method:"DELETE",
                  body:asign.assignmentid
                })
                const res = await nomore.json()
                console.log(res.body)
                getAllassign()

              }}>Delete</button></div>
            </div>
          </>
        );
      } else {
        return <></>;
      }}
    });
    return <>{nowna}</>;
  }
  const sendEdit=async(e: { target: { title: { value: any; }; descrip: { value: any; }; pdate: { value: any; }; ddate: { value: any; }; full: { value: any; }; }; })=>{
    const newAn = {
      title: e.target.title.value,
      des: e.target.descrip.value,
      pdate: e.target.pdate.value,
      ddate: e.target.ddate.value,
      full: e.target.full.value,
      assignmentid:  annoucement.aid
    };
      const response = await fetch('/api/assignment/instructor/new',{
        method:'PUT',
        body:JSON.stringify(newAn)
      })

      const res  = response.json()
      console.log(res.body)
  }

  const Ongoing = () => {
 
    const today = new Date();
  
    const nowna = allasign.map((asign,i) => {
      // console.log(asign.duedate)
      // console.log(asign.publishtime)
      const ddate = new Date(asign.duedate)
      const pdate = new Date(asign.publishtime)
      // console.log(typeof(hi))
      // console.log("now: ", today);
      // console.log("due date: ", hi);
      // console.log(hi > today, " fffffff");
      // console.log(asign.topic)
      // console.log(ddate)
      // console.log(pdate)
      // console.log(today)
      if(i===0){
        return<>
            <div className="bg-purple-200 grid grid-cols-5 p-2 ">
              <p className="underline">Topic</p>
              <p className="underline">Full Score</p>
              <p className="underline">Details</p>
              <p className="underline pl-3">Edit</p>
              <p className="underline pl-3">Delete</p>
            </div>
        </>
      }
      else{
      if (ddate >= today && today >= pdate) {
        return (
          <>
            <div className="grid grid-cols-5 bg-green-200 p-2">
              <p className=" overflow-hidden">{asign.topic}</p>
              <p>{asign.fullscore}</p>
              <div><button className="bg-blue-500 text-white py-1 px-4 rounded" onClick={()=>{router.push(`/courses/instructor_view/${courseId}/assign/${asign.assignmentid}`)}}>Details</button></div>
              <div><button className="bg-blue-500 text-white py-1 px-4 rounded" onClick={()=>{setMode(2)
              setassignment({
                title:asign.topic,
                description:asign.description,
                duedate:asign.duedate,
                pdate:asign.publishtime,
                fullscore:asign.fullscore,
                aid:asign.assignmentid

              })
              }}>Edit</button></div>
              <div><button className="bg-blue-500 text-white py-1 px-4 rounded" onClick={async ()=>{
                const nomore = await fetch('/api/assignment/instructor/getass',{
                  method:"DELETE",
                  body:asign.assignmentid
                })
                const res = await nomore.json()
                console.log(res.body)
                getAllassign()

              }}>Delete</button></div>
            </div>
          </>
        );
      } else {
        return <></>;
      }}
    });
    return <>{nowna}</>;
  };

  const Mainbody = () => {
    if (mode === 0) {
      return (
        <>
          <h1>Welcome to instructor Assignment for Course {title}</h1>
          <div>
            <h1 className="py-2">Ongoing Assignment</h1>
            <Ongoing />
          </div>
          <div>
            <h1 className="py-2">Finished Assignment</h1>
            <Finished/>
          </div>
          <div>
            <h1 className="py-2">Waiting Assignment</h1>
            <Waiting/>
          </div>
          <button
            className="my-2 bg-blue-500 text-white py-2 px-4 rounded"
            onClick={() => {
              setMode(1);
            }}
          >
            <h1>Create Assignment</h1>
          </button>
        </>
      );
    } else if (mode === 1) {
      return (
        <>
          <h1>Create Assignment</h1>
          <p>Whatever date you choose, it will be that date on 7AM</p>
          <form onSubmit={sentNewAssign}>
            <div className="grid grid-cols-3 grid-rows-5">
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
              <div className=" mr-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Publish Date
                </label>
                <input
                  required
                  type="date"
                  id="pdate"
                  name="pdate"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="mx-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Due date
                </label>
                <input
                  required
                  type="date"
                  id="ddate"
                  name="ddate"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div className="ml-5">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Full Score
                </label>
                <input
                required
                  type="number"
                  id="full"
                  name="full"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>
              <div>
                <button className="bg-blue-500 text-white py-2 px-4 rounded">
                  <p>Create Assignment</p>
                </button>
                <ShowErrorAdd/>
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
    } else {
      return  <>
      {console.log(annoucement)}
      <h1>Edit Course</h1>
      <p>Whatever date you choose, it will be that date on 7AM</p>
      <form onSubmit={sendEdit}>
        <div className="grid grid-cols-3 grid-rows-5">
          <div className="my-4 col-span-3">
            <label className="block mb-2 text-sm font-medium text-gray-900 ">
              Title
            </label>
            <input
              placeholder={annoucement.title}
              defaultValue={annoucement.title}
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
              placeholder={annoucement.description}
              defaultValue={annoucement.description}
              required
              rows={6}
              id="descrip"
              name="descrip"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className=" mr-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 ">
              Publish Date
            </label>
            <input
              required
              placeholder={annoucement.pdate}
              defaultValue={annoucement.pdate.substring(0,10)}
              type="date"
              id="pdate"
              name="pdate"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mx-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 ">
              Due date
            </label>
            <input
              required
              placeholder={annoucement.duedate}
              defaultValue={annoucement.duedate.substring(0,10)}
              type="date"
              id="ddate"
              name="ddate"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="ml-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 ">
              Full Score
            </label>
            <input
            required
              type="number"
              placeholder={annoucement.fullscore}
              defaultValue={annoucement.fullscore}
              id="full"
              name="full"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div>
            <button className="bg-blue-500 text-white py-2 px-4 rounded">
              <p>Edit Assignment</p>
            </button>
            <ShowErrorAdd/>
          </div>
          <div>

          </div>
          <div className="pl-5">
            <button className="bg-blue-500 text-white py-2 px-4 rounded" type='button' onClick={()=>{setMode(0)}}><p>Back</p></button>
          </div>
          
        </div>
      </form>
    </>;
    }
  };

  return (
    <>
      <Headerr />
      <div className="pt-10 px-48">
        <Mainbody />
      </div>
    </>
  );
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const courseId = Number(
    Array.isArray(context.params.id) ? context.params.id[0] : context.params.id
  );
  const course = await prisma.course.findUnique({
    where: { id: courseId },
    include: { instructor: true },
  });

  return {
    props: {
      course: {
        ...JSON.parse(JSON.stringify(course)),
        instructor_name: course.instructor.name,
      },
    },
  };
};

export default Home;
