import Image from "next/image";
import { useState, useEffect } from "react";
import Router, { useRouter } from 'next/router'
export const Bodyy = (props: { statemain: string }) => {
  const [errormes, setErrormes] = useState("");
  const router  = useRouter()
  // useEffect(() => {
  //   console.log(props.statemain);
  // }, [props.statemain]);

  const timeout = (time: any) => {
    window.setTimeout(() => {
      setErrormes("");
    }, time);
  };

  const sendRegis = async (e: { target: any; preventDefault: () => void }) => {
    e.preventDefault();

    const regisuser = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      role: e.target.choice.value,
    };

    console.log(regisuser);

    const response = await fetch("/api/login/register", {
      method: "POST",
      body: JSON.stringify(regisuser),
    });
    const res = await response.json();
    console.log(res);
    if (response.status === 500) {
      //if error, don't do and return
      console.log(res.body);
      if (res.body === "We fucked up") {
        setErrormes("Already");
        timeout(3000);
      } else {
      }
      return;
    } else {
      if (res.body.role === "student") {
        localStorage.setItem("id", res.body.id);
        localStorage.setItem("role", res.body.role);
        localStorage.setItem("email", res.body.email)
        console.log("Student!");
        router.push('/student/Dashboard')
         
      } else {
        localStorage.setItem("id", res.body.id);
        localStorage.setItem("role", res.body.role);
        console.log(res.body.email+' ffffffffffff')
        localStorage.setItem("email", res.body.email)
        console.log("Instuctor");
        router.push('/instructor/main')
      }
    }
  };

  const sendLogin = async (e: { target: any; preventDefault: () => void }) => {
    e.preventDefault();

    const loginuser = {
      email: e.target.email1.value,
      password: e.target.password1.value,
    };

    console.log(loginuser);

    const response = await fetch("/api/login/login", {
      method: "POST",
      body: JSON.stringify(loginuser),
    });
    const res = await response.json();

    if (response.status === 500) {
      //if error, don't do and return
      console.log(res.body);
      if (res.body === "Wrong Password") {
        setErrormes("Wrong");
        timeout(3000);
      } else {
        setErrormes("Cantfind");
        timeout(3000);
      }
      return;
    } else {
      //Success login
      console.log(res.body)
      if (res.body.role === "student") {
        localStorage.setItem("id", res.body.id);
        localStorage.setItem("role", res.body.role);
        localStorage.setItem("email", res.body.email)
        console.log("Student!");
        router.push('/student/Dashboard')
      } else {
        localStorage.setItem("id", res.body.id);
        localStorage.setItem("role", res.body.role);
        localStorage.setItem("email", res.body.email)
        console.log("Instuctor!");
        router.push('/instructor/main')
      }
    }
  };

  const ShowErrorAdd = () => {
    if (errormes === "Wrong") {
      return (
        <div className="mt-8 text-red-600">
          <p>Wrong Password!</p>
        </div>
      );
    } else if (errormes === "Cantfind") {
      return (
        <div className="mt-8 text-red-600">
          <p>Can't find your email!</p>
        </div>
      );
    } else if (errormes === "Already") {
      return (
        <div className="mt-8 text-red-600">
          <p>This email already registered!</p>
        </div>
      );
    } else {
      return <div></div>;
    }
  };

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
              <input
                required
                type="text"
                id="name"
                name="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="my-4">
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Email
              </label>
              <input
                required
                type="email"
                id="email"
                name="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="my-4">
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Password
              </label>
              <input
                required
                type="password"
                id="password"
                name="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="flex justify-between py-2 pb-6">
              <div className="flex flex-wrap items-center content-center">
                <label className="block mb-2 text-sm font-medium text-gray-900 ">
                  Choose your role here
                </label>
                <select
                  id="choice"
                  name="choice"
                  className="bg-gray-50 border border-gray-300  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="student">
                    <p>Student</p>
                  </option>
                  <option value="instructor">
                    <p>Instructor</p>
                  </option>
                </select>
              </div>
            </div>
            <button className="bg-blue-500 text-white py-2 px-4 rounded">
              <p>Sign Up</p>
            </button>
            <div>
              <ShowErrorAdd />
            </div>
          </form>
        </>
      );
    } else {
      return (
        <>
          <form className="mt-24 pr-20" onSubmit={sendLogin}>
            <div className="my-4">
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Email
              </label>
              <input
                required
                type="email"
                id="email1"
                name="email1"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="my-4">
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Password
              </label>
              <input
                required
                type="password"
                id="password1"
                name="password1"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="pt-6">
              <button className="bg-blue-500 text-white py-2 px-4 rounded">
                <p>Log in</p>
              </button>
            </div>
            <div>
              <ShowErrorAdd />
            </div>
          </form>
        </>
      );
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
