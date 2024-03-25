import { io } from "socket.io-client";
import { PUBLIC_WEBSOCKET_SERVER } from '$env/static/public';


// The Websocket
export const socket = io(
    `${PUBLIC_WEBSOCKET_SERVER}`
);