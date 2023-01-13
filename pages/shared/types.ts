import { NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io";
import { Server as NetServer, Socket } from "net";

export type NextApiResponseServerIO = NextApiResponse & {
    socket: Socket & {
        server: NetServer & {
            io: SocketIOServer;
        };
    };
};