// @ts-nocheck
import { readdirSync } from "fs";
import path from "path";
import { error } from '@sveltejs/kit';

/** @type {import('../../[user]/control/$types').PageServerLoad} */
export function GET({ setHeaders, url }) {
    try {
        console.log(params);
        const finalFiles = [];

        function* readAllFiles(dir) {
            const files = readdirSync(dir, { withFileTypes: true });

            for (const file of files) {
                if (file.isDirectory()) {
                    yield* readAllFiles(path.join(dir, file.name));
                } else {
                    yield path.join(dir, file.name);
                }
            }
        }

        for (const file of readAllFiles(`$lib/${params.user}`)) {
            console.log(file);
            finalFiles.push(file);
        }

        return new Response(finalFiles);
    } catch (err) {
        return {
            ok: false,
            status: 500,
            errors: err,
            headers: {
                'Content-Type': 'image/*',
            },
            body: null
        }
    }
}


/**
import { error } from '@sveltejs/kit';

export async function GET({ setHeaders, url }) {
    const id = Number(url.searchParams.get('id'));
    try {
        const attachment = {}; // code goes here

        if (!attachment) {
            // If attachment with the given ID is not found, return 404 error
            throw error(404, 'Attachment not found');
        }
        setHeaders({
            'Content-Type': attachment.content_type,
            'Content-Length': attachment.content_length.toString()
        });
        return new Response(attachment);
    } catch (error) {
    throw error(500, "Internal server error")
    }
}
 */