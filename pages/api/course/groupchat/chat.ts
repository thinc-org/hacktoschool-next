import { NextApiRequest } from "next";
import { NextApiResponseServerIO } from "../../../shared/types";

// this will the path where client send chat messages to
export default (req: NextApiRequest, res: NextApiResponseServerIO) => {
    if (req.method === "POST") {
      // get message
      const message = req.body;
  
      if (message.user === "awnI!@OIO23Jjiod8lw+9en#@loi") { // super secret key nawei
        message["from"] = 'instructor'
        message.user = "Instructor"
      } else {
        message["from"] = 'student'
      }


      // dispatch to channel "message"
      // broadcasting back ??
      res?.socket?.server?.io?.emit("message", message);
      console.log("sending");
  
      // return message
      res.status(200).json(message);
    }
  };