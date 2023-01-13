import { faChild } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import SocketIOClient from "socket.io-client"
import { Headerr } from "../../../../../component/headerr";
import { randomTextColor } from "../../../../shared/randomUtil";


interface Imessage {
    user: string;
    message: string;
    from?: string;
}

const GroupChat = ({ BASE_URL }) => {

    // connected flag
    const [connected, setConnected] = useState<boolean>(false);
    // init chat and message
    const [chat, setChat] = useState<Imessage[]>([]);
    const [message, setMessage] = useState<string>("");

    const inputRef = useRef(null);
    const router = useRouter();

    // initiate the connection once 
    useEffect(() => {
        // const socket = SocketIOClient.connect("/api/course/groupchat/socketIO");
        // connect to socket server
        const socket = SocketIOClient.connect(BASE_URL, {
            path: "/api/course/groupchat/socketIO",
        });

        // log socket connection
        socket.on("connect", (message) => {
            console.log("SOCKET CONNECTED!", socket.id);
            setConnected(true);
        });

        // update chat on new message dispatched
        socket.on("message", (message: Imessage) => {
            console.log("received from server : ", message)
            chat.push(message);
            setChat([...chat])

        });

        // socket disconnet onUnmount if exists
        if (socket) return () => socket.disconnect();

    }, []);

    console.log(chat);

    const sendMessage = async () => {
        // if the message in the chatbox is not null
        if (message) {

            const anonymous = router.query.anonymous;
            let userName;
            if (anonymous === 'true') {
                userName = router.query.appearAs;
            } else {
                userName = localStorage.getItem('email');
            }

            const body = {
                user: userName,
                message: message
            };

            console.log(body);
            console.log("sending to server");

            const res = await fetch("/api/course/groupchat/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            })

            if (res.ok) setMessage("");
        }

        // focus after click
        inputRef?.current?.focus();
    }

    return (
        <>
            <Headerr />
            <div className="pt-10 px-48">
                <h1>Group Chat</h1>
                <div id="chat-history" className="overflow-scroll max-h-80">
                    {
                        chat.map((c, id) =>
                            <div className="text-sm p-2 border bg-white">
                                <p className={c.from === "instructor" ? "text-green-500" : ""}>{c.user} : {c.message}</p>
                            </div>
                        )
                    }
                </div>

                <div id="chat-input" className="min-w-full mb-2 flex flex-row fixed bottom-0">
                        <input ref={inputRef}
                            className=" px-2 focus:outline-sky-400 min-w-[60%] mr-2"
                            autoFocus
                            placeholder={connected ? "Type a message..." : "Connecting..."}
                            value={message}
                            onChange={(e) => { setMessage(e.target.value) }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    sendMessage();
                                }
                            }}
                            disabled={!connected}
                        />
                    <button className="bg-sky-400 py-2 px-4 rounded-full mt-2 mx-1 shadow-sm text-white focus:outline-none hover:scale-105 text-md" onClick={() => sendMessage()}><p>SEND</p></button>
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps() {
    const BASE_URL = process.env.BASE_URL;

    return {
        props: {
            BASE_URL
        }
    }
}

export default GroupChat;