import { faBullhorn } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from 'next/router'
import { useEffect, useState } from "react";
import { useSpring, animated } from 'react-spring'

const createAnnouncement = () => {
    const router = useRouter()

    const [showNotify, setShowNotify] = useState(false);
    const [notifyTransform, setNotifyTransform] = useState(-90.0);
    const [intervalId, setIntervalId] = useState();
    const [goingback, setGoingback] = useState(false);
    const [message, setMessage] = useState('');
    
    const onChange = (event) => {
        setMessage(event.target.value);
    };

    const submitHandler = async (e: React.SyntheticEvent) => {
        e.preventDefault();

        const body = {
            message: message,
            courseId: router.query.id,
        }

        const response = await fetch(`/api/announcement`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        const json = await response.json();
        console.log("the json");
        console.log(json);
        if (response.status === 200) {
            // display success msg
            setNotifyTransform(0);
            fadeInNotifyMsg();
        }
    }

    // fade in the notification page
    const fadeInNotifyMsg = () => {
        setIntervalId(setInterval(() => {
            setNotifyTransform(prevValue => prevValue + 0.4)

        }, 10));
    }

    // once the right position is over 1.25, we'll return the instructor to his course page
    useEffect(() => {
        if (notifyTransform >= 1.25) {
            clearInterval(intervalId);
            setTimeout(() => {
                router.push(`/courses/instructor_view/${router.query.id}`)
            }, 1500);
        }
    }, [notifyTransform]);

    const NotifyMsg = () => {
        return (
            // <animated.div style={props}>
            <div className="fixed bg-white p-4 shadow-md bottom-5" id="notifyBox" style={{ right: `${notifyTransform}rem` }}>
                <p className="px-4 py-2 text-emerald-600">Success !</p>
                {/* <p className="px-4 py-2 text-red-400">announce failed!</p> */}
            </div>
            // </animated.div>
        )
    }


    return (
        <>
            {
                true ?
                    <NotifyMsg /> : null
            }
            <div className="flex items-center justify-center h-screen bg-neutral-100">
                <div className="py-5 px-5 shadow-xl bg-white min-w-[50%] min-h-[50%]">
                    <h1 className="mt-5 mb-10 text-2xl text-slate-700">Create Announcement</h1>
                    <div className="text-center">
                        <form onSubmit={submitHandler}>
                            <div>
                                <input value={message} onChange={onChange} placeholder="to all new students, i'd like to ..." id="message" type="text" name="message" className="mb-5 placeholder-gray-300 w-[100%] text-slate-500 bg-gray-100 rounded-sm p-2 border-slate-200 border-2 focus:outline-none focus:border-neutral-100 focus:ring focus:ring-neutral-200" />
                            </div>
                            <div className="mt-2">
                                <button type="submit" className="bg-red-500 py-2 px-4 rounded-full mt-2 ml-30 shadow-lg text-neutral-100 drop-shadow focus:outline-none focus:bg-red-600 hover:bg-red-600 hover:scale-105">
                                    <p>Annouce<FontAwesomeIcon icon={faBullhorn} className="ml-2" /></p>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default createAnnouncement;