// @ts-nocheck
import { fail, redirect } from '@sveltejs/kit';
import usersEmotions from '$lib/server/usersEmotions.js';
import { socket } from '$lib/server/socketClient';

/** @type {import('./$types').Actions} */
export const actions = {
    changeEmotion: async ({ params, request }) => {
        try {
            const formData = await request.formData();
            const selectedEmotion = formData.get("selectedEmotion");
            console.log("ACTION - changeEmotion", formData, selectedEmotion, params.user);

            usersEmotions[params.user] = selectedEmotion;

            console.log("Here's the socket", socket);
            socket.emit("client_sets_emotion", params.user, selectedEmotion, (newEmotion) => {
                console.log(`Successfully changed ${params.user} to ${newEmotion}`);
            });

            return ({
                success: true,
                error: false,
                body:{
                    usersEmotions: usersEmotions
                }
            });
        } catch (err) {
            return fail(500, {
                error: true,
                message: `Unexpected failure ${err}`
            });
        }
    },
};
