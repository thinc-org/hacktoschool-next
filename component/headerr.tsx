import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const Headerr = (props: { selectState: (arg0: string) => void }) => {
  const router = useRouter();
  const [role,setRole] = useState("")
  const [logined, setLogined] = useState("");
  useEffect(() => {
    // console.log(logined);

    setLogined(localStorage.getItem("email"));
    setRole(localStorage.getItem("role"))
  }, []);

  const Loginornot = () => {

    if (logined === "" || logined == null) {
     
      return (
        <div className="col-span-3">
          <span className="p-5">
            <button
              onClick={() => {
                props.selectState("login");
              }}
            >
              <p>Login</p>
            </button>
          </span>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded"
            onClick={() => {
              props.selectState("signup");
            }}
          >
            <p>Sign Up</p>
          </button>
        </div>
      );
    } else {
      return (
        <div className="col-span-3 flex flex-end justify-center items-center">
          <span className="px-5">
            <p>{logined}</p>
          </span>
          <div>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded"
            onClick={() => {
              localStorage.setItem("email", "");
              localStorage.setItem("role", "")
              localStorage.setItem("id","")
              setLogined("");
              router.push("/");
            }}
          >
            <p>Sign Out</p>
          </button>
          </div>
        </div>
      );
    }
  };

  const toAllCourse = () => {
    router.push('/courses');
  }

  const Navcontect=()=>{
    if(role === "student"){
    return(
      <>
      <button className="col-span-2"><p className="text-center hover:scale-125" onClick={()=>{router.push('/courses/student_view/assignment')}}>Assignment</p></button>
      <button><p className="text-center hover:scale-125" onClick={()=>{router.push('/student/profile')}}>Profile</p></button>
      <button><p className="text-center hover:scale-125" onClick={()=>{router.push('/student/dashboard')}}>My Course</p></button>
      <button className="col-span-2" ><p className="text-center hover:scale-125 " onClick={()=>toAllCourse()}>Browse Course</p></button>
      <div className="col-span-2"></div>
      </>
    )}
    else if (role === "instructor"){
      return(
        <>
        <button><p className="text-center hover:scale-125">Main</p></button>
        <button><p className="text-center hover:scale-125" onClick={()=>{router.push('/instructor/profile')}}>Profile</p></button>
        <button><p className="text-center hover:scale-125" onClick={()=>{router.push('/instructor/main')}}>My Course</p></button>
        <button className="col-span-2"><p className="text-center hover:scale-125 " onClick={()=>toAllCourse()}>Browse Course</p></button>
        <div className="col-span-3"></div>
        </>
      )
    }
    else{
      return(
        <>
        <div  className='col-span-2'><button><p className="text-center" onClick={()=>toAllCourse()}>Browse Course</p></button></div>
        <button><p className="text-center hover:scale-125"></p></button>
        <button><p className="text-center hover:scale-125"></p></button>
        <div className="col-span-4"></div>
       
        </>
      )
    }
  }
  return (
    <>
      <div className="grid grid-cols-12 grid-rows-1 pt-16 pl-44 pr-20 items-center">
        <h1
          className="text-left"
          onClick={() => {
            router.push("/");
          }}
        >
          GlobalTalk
        </h1>
        <Navcontect/>
      
        <Loginornot />
      </div>
    </>
  );
};
