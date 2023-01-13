import { useRouter } from "next/router";
import { useState } from "react";
import GODBUTTON from "../../../../../component/GODBUTTON";
import { Headerr } from "../../../../../component/headerr";

const welcomeRoom = () => {
    const router = useRouter();

    return (
        <>
            <Headerr />
            <div className="pt-10 px-48 text-center">
                <h1 className="text-4xl border-b pb-3 border-gray-300">Welcome to Group Chat</h1>
                <p className="text-slate-600 text-2xl mt-2">Rules</p>
                <ul className="text-slate-400">
                    <li><p>1. do not send personal info</p></li>
                    <li><p>2. be patient with your students</p></li>
                    <li><p>3. previous chat messages are not stored</p></li>
                    <li><p>4. be kind</p></li>
                </ul>

                <div className="mt-8">
                    <button onClick={() => router.push(`/courses/instructor_view/${router.query.id}/chat/groupChat`)} className="bg-emerald-500 py-2 px-40 rounded-md mt-2 ml-30 shadow-lg text-neutral-100 drop-shadow focus:outline-none focus:bg-emerald-600 hover:bg-emerald-600 hover:scale-105 text-2xl">
                        <p>JOIN</p>
                    </button>
                </div>

            </div>
        </>
    )
}

export default welcomeRoom;