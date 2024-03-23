// @ts-nocheck
import { writeFileSync } from 'fs';
import { fail, redirect } from '@sveltejs/kit'
import { put } from '@vercel/blob'
import { BLOB_READ_WRITE_TOKEN } from '$env/static/private'

// Local storage or not.
const local = false;
/**
 * Either uploads a file into the `/src/lib/vtubers/{userName}` folder or the vercel cloud based on the given `uploadDetails`
 * @param {UploadDetails} uploadDetails 
 */
const writeOrPutFile = async (uploadDetails) => {
    if(uploadDetails.isLocal){
        writeFileSync(
            `src/lib/vtubers/${uploadDetails.userName}/${uploadDetails.groupName}-${uploadDetails.isQuiet ? "quiet" : "speak"}${uploadDetails.isBlink ? "-blink" : ""}.${uploadDetails.fileExtension}`, 
            uploadDetails.file
        );
        console.log(`WROTE ${uploadDetails.isQuiet ? "QUIET" : "SPEAK"} ${uploadDetails.isBlink ? "BLINK" : ""} FILE TO LIB!`)
    }else{
        const { url } = await put(
            `${uploadDetails.userName}/${uploadDetails.groupName}-${uploadDetails.isQuiet ? "quiet" : "speak"}${uploadDetails.isBlink ? "-blink" : ""}.${uploadDetails.fileExtension}`, 
            uploadDetails.file, 
            {
                access: 'public',
                token: BLOB_READ_WRITE_TOKEN,
            }
        );
        console.log(`UPLOADED ${uploadDetails.isQuiet ? "QUIET" : "SPEAK"} ${uploadDetails.isBlink ? "BLINK " : ""}FILE TO VERCEL CLOUD! @${url}`)
    }
}

export const actions = {
    upload: async ({ request, params }) => {
        // This needs to be defined outside of the try-catch so we can use it in the redirect.
        const userName = params.user;
        try {
            const formData = await request.formData();

            console.log("formData");
            console.dir(formData);

            console.log("params");
            console.dir(params);

            const groupName = formData.get("groupName");
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
                    writeOrPutFile({
                        file: Buffer.from(await quietFile?.arrayBuffer()),

                        userName: userName,
                        groupName: groupName,
                        fileExtension: quietFileExtension,

                        isLocal: local,
                        isQuiet: true,
                        isBlink: false,
                    });
                }
                if(speakFile && speakFileExtension){
                    writeOrPutFile({
                        file: Buffer.from(await speakFile?.arrayBuffer()),

                        userName: userName,
                        groupName: groupName,
                        fileExtension: speakFileExtension,

                        isLocal: local,
                        isQuiet: false,
                        isBlink: false,
                    });
                }
                if(blinks){
                    if(quietBlinkFile && quietBlinkFileExtension){
                        writeOrPutFile({
                            file: Buffer.from(await quietBlinkFile?.arrayBuffer()),
    
                            userName: userName,
                            groupName: groupName,
                            fileExtension: quietBlinkFileExtension,
    
                            isLocal: local,
                            isQuiet: true,
                            isBlink: true,
                        });
                    }
                    if(speakBlinkFile && speakBlinkFileExtension){
                        writeOrPutFile({
                            file: Buffer.from(await speakBlinkFile?.arrayBuffer()),
    
                            userName: userName,
                            groupName: groupName,
                            fileExtension: speakBlinkFileExtension,
    
                            isLocal: local,
                            isQuiet: false,
                            isBlink: true,
                        });
                    }
                }
            }
        } catch (err) {
            console.log("oops... broke upload/+page.server.js", err);
            return fail(500, {
                error: true,
                message: `Unexpected failure ${err}`
            });
        }

        // A 303 Redirect is a FORM REDIRECT which tells browsers not to resubmit data when the back button is pressed.
        redirect(303, `/${userName}/upload`);
    }
};

/**
 * @typedef {Object} UploadDetails
 * @property {string} file - The file to be uploaded to the lib folder or vercel blob
 * @property {('Naka' | 'Zuzu' | 'Kuro' | 'Ghost')} userName - The name of the user this file will be assigned to.
 * Determines the folder the file goes in.
 * @property {string} groupName - Indicates whether the Courage component is present.
 * @property {string} fileExtension - The file extension of the file to upload to the cloud.
 * @property {boolean} isLocal - NOT YET IMPLEMENTED! If true, uploads the file to /src/lib/vtubers/{userName} folder.
 * If false, uploads to the vercel blob.
 * @property {boolean} isQuiet - Indicates whether the uploaded image is a speaking avatar.
 * @property {boolean} isBlink - Indicates whether the uploaded image is the blinking version of the avatar.
 */