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

  const [mode, setMode] = useState(0);
  const [alldis, setAlldis] = useState([]);

  useEffect(() => {
    //adding font awesome
    // for some future features
    getAllDis();
  }, []);
  const getAllDis = async () => {
    const nana = {
      id: courseId,
      sid: localStorage.getItem("id"),
      role: localStorage.getItem("role"),
    };
    const res = await fetch("/api/discussion/getall", {
      method: "POST",
      body: JSON.stringify(nana),
    });
    const alldis = await res.json();
    console.log(alldis.body);
    setAlldis(alldis.body);
  };

  const sentNewDis = async (e: {
    preventDefault: () => void;
    target: {
      title: { value: any };
      descrip: { value: any };
      pdate: { value: any };
      ddate: { value: any };
      full: { value: any };
    };
  }) => {
    e.preventDefault();

    const newAn = {
      title: e.target.title.value,
      des: e.target.descrip.value,
      cid: courseId,
      id: localStorage.getItem("id"),
      role: localStorage.getItem("role"),
    };

    const response = await fetch("/api/discussion/new", {
      method: "POST",
      body: JSON.stringify(newAn),
    });
    const res = await response.json();
    console.log(res.body + "  dddddd");
    setMode(0);
    getAllDis();
  };

  const sentLike = async (id) => {
    if (localStorage.getItem("role") === "instructor") {
      return;
    }
    const nana = {
      id: id,
      sid: localStorage.getItem("id"),
    };
    const response = await fetch("/api/discussion/getone", {
      method: "POST",
      body: JSON.stringify(nana),
    });
    const res = await response.json();
    console.log(res.body);

    getAllDis();
  };

  const sentComment = async (e, id) => {
    e.preventDefault();
    const nana = {
      id: id,
      comment: e.target.comment.value,
      sid: localStorage.getItem("id"),
      role: localStorage.getItem("role"),
    };

    const res = await fetch("/api/discussion/newcomment", {
      method: "POST",
      body: JSON.stringify(nana),
    });
    const resp = await res.json();
    getAllDis()
  };

  const sentDelete = async (target,see) =>{
    const nana = {
      target:target.target,
      type: target.see
    }
    const res = await fetch("/api/discussion/getall", {
      method: "DELETE",
      body: JSON.stringify(nana),
    });
    const ee = res.json()
    getAllDis()
  }

  const Discussbidy = () => {
    const I = alldis.map((element) => {
      const Go = () => {
        if (element.already) {
          return <FontAwesomeIcon size="lg" icon={faThumbsUp} />;
        } else {
          return <FontAwesomeIcon size="lg" icon={anotherFaThumb} />;
        }
      };
      const [mode, setMode] = useState(false);
      const Comment = () => {
        if (mode) {
          const allcom = element.allcomment.map((e) => {
            return (
              <div className="flex flex-wrap py-2 items-center">
                <p className="text-sm">Name : {e.name}</p>
                <p className="px-3 text-xs">{e.detail}</p>
                <Deletebut target={e.id} see={'comment'}/>
              </div>
            );
          });
          return <div className="pt-2">{allcom}</div>;
        } else {
          return <></>;
        }
      };

      const Deletebut=(target,see)=>{
        if(localStorage.getItem('role') === 'instructor' ){
          return <>  <button className="ml-20 px-4 py-2 bg-red-500 rounded-full" onClick={()=>{sentDelete(target,see)}}><p className="text-xs">Delete</p></button></>
        }
        else{
          return <></>
        }
      }

      return (
        <>
          <div className="   m-5 my-5 p-3 bg-gradient-to-r to-sky-200 from-emerald-200 ">
            <div className="flex justify-center items-center">
              <h1 className="text-xl">{element.topic}</h1>
              <Deletebut target={element.id} see={'discussion'}/>
            </div>
            <p className="text-sm">Wrote By : {element.name}</p>
            <p className="text-xs my-2">{element.detail}</p>
            <div className="flex items-center ">
              <div onClick={() => sentLike(element.id)}>
                <Go />
              </div>
              <p className="text-s pl-2">{element.like}</p>
              <span
                className="pl-3"
                onClick={() => {
                  if (mode) {
                    setMode(false);
                  } else {
                    setMode(true);
                  }
                }}
              >
                <FontAwesomeIcon size="lg" icon={faComment} />
              </span>
              <p className="text-s pl-2">{element.allcomment.length}</p>
              <div className="relative ml-5 mx-5 item-end w-full ">
                <form onSubmit={(e) => sentComment(e, element.id)}>
                  <input
                    className="rounded-full px-3 w-4/5 "
                    name="comment"
                    id="comment"
                  />
                  <button className="ml-5 bg-white px-3 rounded-full">
                    <p>Comment</p>
                  </button>
                </form>
              </div>
            </div>

            <Comment />
          </div>
        </>
      );
    });
    return <>{I}</>;
  };

  const Mainbody = () => {
    if (mode === 0) {
      return (
        <>
          <Discussbidy />
          <h1 className="">Create Discussion</h1>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded"
            type="button"
            onClick={() => {
              setMode(1);
            }}
          >
            <p>Go</p>
          </button>
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
          </form>
        </>
      );
    } else {
      return <></>;
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
