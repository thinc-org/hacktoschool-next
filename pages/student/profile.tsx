import { GetServerSideProps } from "next";
import Router from "next/router";
import { useEffect, useState } from "react";
import { Headerr } from "../../component/headerr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faEnvelope, faInfo, faLink, faPhone, faThumbsUp, faUserDoctor } from "@fortawesome/free-solid-svg-icons";

export default function Studentprofile() {
  const [editmode, setEditmode] = useState(false);
  const [studentprofile,setStudentprofile] = useState({
    firstname: '',
    lastname: '',
    age: 0,
    tel: '',
    psub: '',
    des: '',
    link:'',
    email: '',
    role:''
  });

  useEffect(()=>{
    initProfile()
  },[])

  const initProfile = async()=>{
    const response = await fetch('/api/student/getprofile',{
        method:'POST',
        body: localStorage.getItem('id')
    })
    const res = await response.json()
    console.log('now ',res.body)
    const data = res.body 
    if(data === 'none'){

    }
    else{
    setStudentprofile({
        firstname:data.firstname,
        lastname:data.lastname,
        age:data.age,
        tel:data.tel,
        psub:data.preferredsub,
        des: data.description,
        link:data.link,
        email:localStorage.getItem('email'),
        role: localStorage.getItem('role')
    })
    console.log(studentprofile)
        
    }
  }

  const sendEditinfo = async(e: { target: any; preventDefault: () => void }) =>{
    e.preventDefault();
   
    const studentinfo = {
        firstname: e.target.fname.value,
        lastname: e.target.lname.value,
        age: e.target.age.value,
        tel: e.target.phone.value,
        psub: e.target.psub.value,
        des: e.target.descrip.value,
        link: e.target.link.value,
        studentid: localStorage.getItem('id')
      
    }

    console.log(studentinfo,' dddddddddd') 

    const response = await fetch('/api/student/profile',{
        method:'POST',
        body: JSON.stringify(studentinfo)
    })

    const res = await response.json()
    console.log('return ma ja ', res.body)
    const data = res.body
    setStudentprofile({
        firstname:data.firstname,
        lastname:data.lastname,
        age:data.age,
        tel:data.tel,
        psub:data.preferredsub,
        des: data.description,
        link:data.link, 
        email:localStorage.getItem('email'),
        role: localStorage.getItem('role')
    })
    setEditmode(false)

  }

  const EditComponent = () => {
    if (!editmode) {
      return <>
      <div className="grid grid-cols-3 grid-rows-6 pt-5 gap-5">
      <div className="flex flex-wrap bg-green-200 rounded-full items-center col-span-2"><span className="px-5"><FontAwesomeIcon icon={faAddressCard} size="xl"/></span><p>{studentprofile.firstname} {studentprofile.lastname}</p></div>
      <div className="flex flex-wrap bg-green-200 rounded-full items-center"><span className="px-5"><FontAwesomeIcon icon={faAddressCard} size="xl"/></span><p>{studentprofile.age}</p></div>
      <div className="flex flex-wrap bg-green-200 rounded-full items-center"><span className="px-5"><FontAwesomeIcon icon={faUserDoctor} size="xl"/></span><p>{studentprofile.role}</p></div>
      <div className="flex flex-wrap bg-green-200 rounded-full items-center"><span className="px-5"><FontAwesomeIcon icon={faEnvelope} size="xl"/></span><p>{studentprofile.email}</p></div>
      <div className="flex flex-wrap bg-green-200 rounded-full items-center"><span className="px-5"><FontAwesomeIcon icon={faPhone} size="xl"/></span><p>{studentprofile.tel}</p></div>
      <div className="flex flex-wrap bg-green-200 rounded-full items-center col-span-3"><span className="px-5"><FontAwesomeIcon icon={faThumbsUp} size="xl"/></span><p>{studentprofile.psub}</p></div>
      <div className="flex flex-wrap bg-green-200 rounded-full items-center col-span-3"><span className="px-5"><FontAwesomeIcon icon={faInfo} size="xl"/></span><p>{studentprofile.des}</p></div>
      <div className="flex flex-wrap bg-green-200 rounded-full items-center col-span-2"><span className="px-5"><FontAwesomeIcon icon={faLink} size="xl"/></span><a href={studentprofile.link} target="_blank" rel="noopener noreferrer">{studentprofile.link}</a></div>
      <div>
          <button
            className="bg-green-500 text-white py-2 px-4 rounded"
            onClick={() => {
              setEditmode(true);
            }}
          >
            <p>Edit Profile</p>
          </button>
        </div>
      </div>
      </>;
    } else {
      return (
        <>
          <h1>Welcome to Editmode</h1>
          <form className="mt-4 pr-20" onSubmit={sendEditinfo}>
            <div className="grid grid-cols-3 grid-rows-4">
            <div className="m-3">
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                First Name
              </label>
              <input
                type="text"
                id="fname"
                name="fname"
                defaultValue={studentprofile.firstname}
                placeholder={studentprofile.firstname}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="m-3">
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Last Name
              </label>
              <input
                type="text"
                id="lname"
                name="lname"
                defaultValue={studentprofile.lastname}
                placeholder={studentprofile.lastname}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="m-3">
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                defaultValue={studentprofile.age}
                placeholder={studentprofile.age ? studentprofile.age.toString():0}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="m-3">
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Telephone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                defaultValue={studentprofile.tel}
                placeholder={studentprofile.tel}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="m-3 col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Prefered Subject (please space between each subject)
              </label>
              <input
                type="text"
                id="psub"
                name="psub"
                defaultValue={studentprofile.psub}
                placeholder={studentprofile.psub}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="m-3 col-span-3">
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Description
              </label>
              <input
                type="text"
                id="descrip"
                name="descrip"
                defaultValue={studentprofile.des}
                placeholder={studentprofile.des}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="m-3 col-span-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Link (Your social media link, please provide only one link)
              </label>
              <input
                type="text"
                id="link"
                name="link"
                defaultValue={studentprofile.link}
                placeholder={studentprofile.link}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </div>
            <div className="m-3 items-center flex-wrap justify-center content-end flex">
            <button className="bg-blue-500 text-white py-2 px-4 rounded">
              <p>Confirm</p>
            </button>
            </div>
            </div>
           
           
          </form>
        </>
      );
    }
  };

  return (
    <>
      <Headerr />
      <div className="pt-10 px-48">
        <h1>Welcome to Your Profile</h1>
        
        <EditComponent />
      </div>
    </>
  );
}
