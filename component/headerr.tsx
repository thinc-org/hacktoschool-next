import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export const Headerr = (props: { selectState: (arg0: string) => void }) => {
  const router = useRouter();
  const [logined, setLogined] = useState("");
  useEffect(() => {
    // console.log(logined);

    setLogined(localStorage.getItem("email"));
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
        <div className="col-span-3 flex flex-end items-center">
          <span className="px-5">
            <p>{logined}</p>
          </span>
          <div>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded"
            onClick={() => {
              localStorage.setItem("email", "");
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
        <p className="text-right">Main</p>
        <p className="text-right">Guide</p>
        <p className="text-right">Statistics</p>
        <p className="text-right">Games</p>
        <div className="col-span-4"></div>
        <Loginornot />
      </div>
    </>
  );
};
