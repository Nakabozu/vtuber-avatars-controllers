// @ts-nocheck
import { error } from '@sveltejs/kit';
import { usersEmotions } from '$lib/server/usersEmotions'

/** @type {import('./$types').LayoutLoad} */
export function load({ params }) {
	if (Object.keys(usersEmotions).some((user)=>{
        return user.toLocaleLowerCase() === String(params.user).toLocaleLowerCase()
    })){
        return {
            user: params.user,
            usersEmotions: usersEmotions
        };
    }else{
        console.error(`${params.user} was __NOT__ granted access`);
        error(404, 'Not found');
    }
}