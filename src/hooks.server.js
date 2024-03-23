// @ts-nocheck

/* ******************************************************* *
 * Everything in here runs ONCE when the server is hosted. *
 * ******************************************************* */
import {configureWebsocket} from "../websocket";
import { socket } from "$lib/server/socketClient";
import usersEmotions from '$lib/server/usersEmotions.js';

configureWebsocket();

socket.on("server_updates_emotion", (user, emotion)=>{
    console.log(`SvelteKit server noticed that the ${user} updated their emotion to ${emotion}.`);
    if(usersEmotions && usersEmotions[user]){
        usersEmotions[user] = emotion;
    }
});

// export const handle = async ({ event, resolve }) => {
// }