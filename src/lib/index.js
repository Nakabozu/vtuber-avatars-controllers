// place files you want to import through the `$lib` alias in this folder.
import { writable } from 'svelte/store';
import { io } from "socket.io-client";
import { PUBLIC_WEBSOCKET_SERVER } from '$env/static/public';

export const local = writable(false);

export const socket = io(
    `${PUBLIC_WEBSOCKET_SERVER}`
);