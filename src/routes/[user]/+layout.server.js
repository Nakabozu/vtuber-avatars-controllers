// @ts-nocheck
import { error } from '@sveltejs/kit';
import { usersEmotions } from '$lib/server/usersEmotions'
import { list } from "@vercel/blob";
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private'

// NOTE TO SELF:
// The data in here doesn't go directly to +page.svelte
// You have to pass it into the load function in +page.js and then pass that into the return there.

/** @type {import('./$types').LayoutLoad} */
export async function load({ params }) {
    let userName = params.user;

    const { blobs } = await list({token: BLOB_READ_WRITE_TOKEN, prefix: `${userName}/`});
    const imageLinks = blobs.map((blob) => {
        if(blob.size > 74){
            return blob.url;
        }
    })
    const filteredImageLinks = imageLinks.filter(link => link);

	if (Object.keys(usersEmotions).some((user)=>{
        return user.toLocaleLowerCase() === String(userName).toLocaleLowerCase()
    })){
        return {
            user: userName,
            usersEmotions: usersEmotions,
            imageLinks: filteredImageLinks,
        };
    }else{
        console.error(`${userName} was __NOT__ granted access`);
        error(404, 'Not found');
    }
};