// @ts-nocheck
import { writeFileSync } from 'fs';
import { fail, redirect } from '@sveltejs/kit'

export const actions = {
    // @ts-ignore
    upload: async ({ request, params }) => {
        try {
            const formData = await request.formData();

            console.log("formData");
            console.dir(formData);

            console.log("params");
            console.dir(params);

            const groupName = formData.get("groupName");
            const userName = params.user;
            const blinks = formData.get("blinks") === "on";
            
            /**@type {File} */
            const quietFile = await formData.get("quietFileToUpload");
            const quietFileExtension = quietFile?.name?.split(".")[quietFile?.name?.split(".")?.length - 1];
            console.log("Quiet file stuff:", quietFile, `${groupName}-quiet.${quietFileExtension}`);
    
            /**@type {File} */
            const speakFile = await formData.get("speakFileToUpload");
            const speakFileExtension = speakFile?.name?.split(".")[speakFile?.name?.split(".")?.length - 1];
            console.log("Speak file stuff:", speakFile, `${groupName}-speak.${speakFileExtension}`);

            /**@type {File} */
            const quietBlinkFile = await formData.get("quietBlinkFileToUpload");
            const quietBlinkFileExtension = quietBlinkFile?.name?.split(".")[quietBlinkFile?.name?.split(".")?.length - 1];
            console.log("Quiet Blink file stuff:", quietBlinkFile, `${groupName}-quiet.${quietBlinkFileExtension}`);
    
            /**@type {File} */
            const speakBlinkFile = await formData.get("speakBlinkFileToUpload");
            const speakBlinkFileExtension = speakBlinkFile?.name?.split(".")[speakBlinkFile?.name?.split(".")?.length - 1];
            console.log("Speak Blink file stuff:", speakBlinkFile, `${groupName}-speak.${speakBlinkFileExtension}`);

            if(userName){
                if(quietFile && quietFileExtension){
                    writeFileSync(
                        `src/lib/vtubers/${userName}/${groupName}-quiet.${quietFileExtension}`, 
                        Buffer.from(await quietFile?.arrayBuffer())
                    );
                    console.log("WROTE QUIET FILE!");
                }
                if(speakFile && speakFileExtension){
                    writeFileSync(
                        `src/lib/vtubers/${userName}/${groupName}-speak.${speakFileExtension}`,
                        Buffer.from(await speakFile?.arrayBuffer())
                    );
                    console.log("WROTE SPEAK FILE!");
                }
                if(blinks){
                    if(quietBlinkFile && quietBlinkFileExtension){
                        writeFileSync(
                            `src/lib/vtubers/${userName}/${groupName}-quiet-blink.${quietBlinkFileExtension}`, 
                            Buffer.from(await quietBlinkFile?.arrayBuffer())
                        );
                        console.log("WROTE QUIET BLINK FILE!");
                    }
                    if(speakBlinkFile && speakBlinkFileExtension){
                        writeFileSync(
                            `src/lib/vtubers/${userName}/${groupName}-speak-blink.${speakBlinkFileExtension}`,
                            Buffer.from(await speakBlinkFile?.arrayBuffer())
                        );
                        console.log("WROTE SPEAK BLINK FILE!");
                    }
                }
            }
            
            return ({
                success: true,
                error: false
            });
        } catch (err) {
            console.log("oops... broke upload/+page.server.js", err);
            return fail(500, {
                error: true,
                message: `Unexpected failure ${err}`
            });
        }
    }
};
