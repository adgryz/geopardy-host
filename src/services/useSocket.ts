import { useEffect } from "react";
import { Socket } from "socket.io-client";

// export const getUseSocket =
//   (socket: Socket) => (message: string, handler: (...args: any[]) => void) => {
//     useEffect(() => {
//       socket.on(message, handler);
//       return () => {
//         socket.off(message);
//       };
//     });
//   };

export const getUseSocket =
  (socket: Socket) => (message: string, handler: (...args: any[]) => void) => {
    useEffect(() => {
      socket.on(message, (payload) => {
        console.log("HANDLE ", message);
        console.log("payload", payload);
        handler(payload);
      });
      return () => {
        socket.off(message);
      };
    });
  };
