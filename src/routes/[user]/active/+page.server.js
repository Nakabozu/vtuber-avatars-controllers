// @ts-nocheck
import { writeFileSync } from 'fs';
import { fail, redirect } from '@sveltejs/kit'

export const actions = {
    // @ts-ignore
    upload: async ({ request }) => {
        try {
            const formData = await request.formData();
            const groupName = formData.get("groupName");
            const userName = formData.get("userName");
            console.log("formData");
            console.dir(formData);

            /**@type {File} */
            const quietFile = await formData.get("quietFileToUpload");
            const quietFileExtension = quietFile?.name?.split(".")[quietFile?.name?.split(".")?.length - 1];
            console.log("Quiet file stuff:", quietFile, `${groupName}-quiet.${quietFileExtension}`);
    
            /**@type {File} */
            const speakFile = await formData.get("speakFileToUpload");
            const speakFileExtension = speakFile?.name?.split(".")[speakFile?.name?.split(".")?.length - 1];
            console.log("Speak file stuff:", speakFile, `${groupName}-speak.${speakFileExtension}`);

            if(quietFile && quietFileExtension && userName){
                writeFileSync(`$lib/${userName}/${groupName}-quiet.${quietFileExtension}`, Buffer.from(await quietFile?.arrayBuffer()));
                console.log("WROTE QUIET FILE!");
            }
            if(speakFile && speakFileExtension && userName){
                writeFileSync(`$lib/${userName}/${groupName}-speak.${speakFileExtension}`, Buffer.from(await speakFile?.arrayBuffer()));
                console.log("WROTE SPEAK FILE!");
            }
            return ({
                success: true,
                error: false
            });
        } catch (err) {
            return fail(500, {
                error: true,
                message: `Unexpected failure ${err}`
            });

        }
    }
};
