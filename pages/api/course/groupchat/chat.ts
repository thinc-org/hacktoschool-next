import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../../../shared/types";

// this will the path where client send chat messages to
export default (req: NextApiRequest, res: NextApiResponseServerIO) => {
    if (req.method === "POST") {
      // get message
      const message = req.body;
  
      // dispatch to channel "message"
      // broadcasting back ??
      res?.socket?.server?.io?.emit("message", message);
  
      // return message
      res.status(200).json(message);
    }
  };