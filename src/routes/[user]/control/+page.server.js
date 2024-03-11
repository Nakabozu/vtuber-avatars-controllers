// @ts-nocheck
import { writeFileSync } from 'fs';
import { fail, redirect } from '@sveltejs/kit';
import usersEmotions from '$lib/server/usersEmotions.js';

export async function load({ }) {
	return {
		usersEmotions: usersEmotions,
	};
}

export const actions = {
    changeEmotion: async ({ request }) => {
        try {
            const formData = await request.formData();
            const selectedEmotion = formData.get("selectedEmotion");
            const user = formData.get("user");
            console.log("ACTION - changeEmotion", formData, selectedEmotion, user);

            usersEmotions[user] = selectedEmotion;

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
    }
};
