import { GetServerSideProps } from "next";
import Router from "next/router";
import { useEffect, useState } from "react";
import { Headerr } from "../../component/headerr";

export default function Studentprofile(){
return(
    <>
    <Headerr/>
    <h1>Welcome to Your Profile</h1>
    </>
)
}