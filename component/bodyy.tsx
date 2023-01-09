import Image from "next/image";
import { useState, useEffect } from "react";
export const Bodyy = (props: { statemain: string }) => {
  useEffect(() => {
    console.log(props.statemain);
  }, [props.statemain]);

  const sendRegis=(e: {
    target: any; preventDefault: () => void; 
})=>{
    e.preventDefault()
    const regisuser={
      name:e.target.name.value,
      email:e.target.email.value,
      password:e.target.password.value
    }

    console.log(regisuser)
  }

  const Gridfirst = () => {
    if (props.statemain === "main") {
      return (
        <>
          <p className="text-customtext1 pt-14">E-course platform</p>
          <h1 className="text-5xl py-6">
            Learning and teaching online, made easy.
          </h1>
          <p className="py-3">
            Gain subject certificate earn money while teaching online with
            GlobalTalk.{" "}
          </p>
          <div className="pt-5">
            <button className="pr-8">
              <p>Sign in</p>
            </button>
            <button className="bg-blue-500 text-white py-2 px-4 rounded">
              <p>Learn more</p>
            </button>
          </div>
          <div className="grid grid-cols-2 grid-rows-1 gaps-2 pt-8">
            <div>
              <h1 className="text-3xl">700++</h1>
              <p>Hours of context</p>
            </div>
            <div>
              <h1 className="text-3xl">575k+</h1>
              <p>Active Users</p>
            </div>
          </div>
        </>
      );
    } else if (props.statemain === "signup") {
      return (
        <>
          <form className="mt-24 pr-20" onSubmit={sendRegis}>
            <div className="my-4">
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Name
              </label>
              <input id='name' name='name' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            <div className="my-4">
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Email
              </label>
              <input id='email' name='email' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            <div className="my-4">
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Password
              </label>
              <input id='password' name='password' className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </div>
            <div className="flex justify-between py-2 pb-6">
              <div className="flex flex-wrap items-center content-center">
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
               Choose your role here
              </label>
                <select className="bg-gray-50 border border-gray-300  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <option><p>Student</p></option>
                  <option><p>Instructor</p></option>
                </select>
              </div>
             
            </div>
            <button className="bg-blue-500 text-white py-2 px-4 rounded">
              <p>Go</p>
            </button>
          </form>
        </>
      );
    } else {
      return <></>;
    }
  };

  return (
    <div className=" pl-44 pr-20 grid grid-cols-2 grid-rows-1">
      <div className="align-middle">
        <Gridfirst />
      </div>
      <div className="pt-8 pl-16">
        <div className="absolute top-[30%] left-[55%]">
          <img className="max-w-[10rem]" src="/gatakblur.png" />
        </div>
        <div className="absolute top-[20%] left-[55%]">
          <img className="max-w-lg" src="/boysitbook.png" />
        </div>
        <div className="absolute top-[20%] left-[72%]">
          <img className="max-w-[24rem]" src="/gatakblur2.png" />
        </div>
      </div>
    </div>
  );
};
