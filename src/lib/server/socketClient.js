import { io } from "socket.io-client";
import { WEBSOCKET_SERVER } from '$env/static/private';


// The Websocket
export const socket = io(
    `${WEBSOCKET_SERVER}`
);