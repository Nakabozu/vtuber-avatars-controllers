import { io } from "socket.io-client";

// The Websocket
export const socket = io(
    "ws://localhost:5674"
    //"wss://134.209.222.229:5100/"
);