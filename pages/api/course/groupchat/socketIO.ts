import { NextApiRequest } from "next";
import { Server as SocketIOServer } from "socket.io";
import { Server as HTTPServer } from "http";
import { NextApiResponseServerIO } from "../../../shared/types";

export const config = {
    api: {
        bodyParser: false,
    },
};

// returning an SocketIOServer (from the socket.io package) back as part of the res object to the client
// this path will be their communication pipe
// in that pipe there will be a channel called "message" which we will emit the message
export default async (req: NextApiRequest, res: NextApiResponseServerIO) => {
    if (!res.socket.server.io) {
        console.log("New Socket.io server...");
        // adapt Next's net Server to http Server
        const httpServer: HTTPServer = res.socket.server as any;
        const io = new SocketIOServer(httpServer, {
            path: "/api/course/groupchat/socketIO",
        });
        // append SocketIO server to Next.js socket server response
        res.socket.server.io = io;

        res?.socket?.server?.io?.emit("message", {
            user: "server-debug",
            message: "wellllll",
        });
    }
    res.status(200)
    // res.end();
};