import { useRouter } from "next/router";
import { useState } from "react";
import GODBUTTON from "../../../../../component/GODBUTTON";
import { Headerr } from "../../../../../component/headerr";

const welcomeRoom = () => {
    const [anonymous, setAnonymous] = useState(true);
    const router = useRouter();

    return (
        <>
            <Headerr />
            <div className="pt-10 px-48 text-center">
                <h1 className="text-4xl border-b pb-3 border-gray-300">Welcome to Group Chat</h1>
                <p className="text-slate-600 text-2xl mt-2">Rules</p>
                <ul className="text-slate-400">
                    <li><p>1. do not send personal info</p></li>
                    <li><p>2. do not spam</p></li>
                    <li><p>3. previous chat messages are not stored</p></li>
                    <li><p>4. be kind</p></li>
                </ul>
                <div>
                    <button className="py-2 px-4 rounded-full mt-2 mx-1 shadow-sm text-neutral-300 focus:outline-none hover:scale-105 text-xs" style={anonymous ? { backgroundColor: "rgb(168 162 158)", color: "rgb(245 245 245)" } : { backgroundColor: "transparent", color: "rgb(212 212 212)" }} onClick={() => setAnonymous(true)}><p>Anonymous</p></button>

                    <button className="py-2 px-4 rounded-full mt-2 mx-1 shadow-sm text-neutral-300 focus:outline-none hover:scale-105 text-xs" style={!anonymous ? { backgroundColor: "rgb(168 162 158)", color: "rgb(245 245 245)" } : { backgroundColor: "transparent", color: "rgb(212 212 212)" }} onClick={() => setAnonymous(false)}><p>Show Name</p></button>
                </div>

                <div className="mt-8">
                    <button onClick={() => router.push(`/courses/student_view/${router.query.id}/chat/groupChat?anonymous=${anonymous}`)} className="bg-emerald-500 py-2 px-40 rounded-md mt-2 ml-30 shadow-lg text-neutral-100 drop-shadow focus:outline-none focus:bg-emerald-600 hover:bg-emerald-600 hover:scale-105 text-2xl">
                        <p>JOIN</p>
                    </button>
                </div>

            </div>
        </>
    )
}

export default welcomeRoom;