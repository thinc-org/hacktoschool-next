import { useState, useEffect, useRef } from "react";
import SocketIOClient from "socket.io-client"
import { Headerr } from "../../../../../component/headerr";


interface Imessage {
    user: string;
    message: string;
}

const GroupChat = () => {

    // connected flag
    const [connected, setConnected] = useState<boolean>(false);
    // init chat and message
    const [chat, setChat] = useState<Imessage[]>([]);
    const [message, setMessage] = useState<string>("");

    const inputRef = useRef(null);

    // initiate the connection once 
    useEffect(() => {
        console.log(process.env.BASE_URL)
        // const socket = SocketIOClient.connect("/api/course/groupchat/socketIO");
        // connect to socket server
        const socket = SocketIOClient.connect(process.env.BASE_URL, {
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

    }, []);

    const sendMessage = async () => {
        // if the message in the chatbox is not null
        if (message) {

            const body = {
                user: localStorage.getItem('email'),
                message: message
            };

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
                <div id="chat-history">
                    {
                        chat.map((c, id) =>
                            <div key={id}>
                                <p>{c.user} : {c.message}</p>    
                            </div>
                        )
                    }
                </div>

                <div id="chat-input">
                    <input ref={inputRef}
                    placeholder={connected ? "Type a message..." : "Connecting..."}
                    value = {message}
                    onChange={(e) => {setMessage(e.target.value)}}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            sendMessage();
                        }
                    }}
                    disabled={!connected}
                    />
                </div>
            </div>
        </>
    )
}

export default GroupChat;