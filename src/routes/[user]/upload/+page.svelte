<script>
// @ts-nocheck
    export let data;
    import { enhance } from '$app/forms';

    $: user = data.user ?? "unknown individual that shouldn't be here";
    let images = [];
    const MAX_IMAGES_ALLOWED = 40;

    let groupName = '';
    let blinks = false;
    const groupNameValidation = new RegExp('[a-zA-Z]{2,16}');

    const emotionList = [
        "shook",
        "mad",
        "pfft",
        "aaaaaa",

        "anguished",
        "ashamed",
        "astonished",
        "awestruck",
        "brazen",
        "cheeky",
        "disgruntled",
        "enlightened",
        "euphoric",
        "gloomy",
        "greedy",
        "grumpy",
        "hysteric",
        "indifferent",
        "insane",
        "jovial",
        "jubilant",
        "mortified",
        "mystified",
        "obstinate",
        "panicked",
        "pensive",
        "perplexed",
        "satisfied",
        "sparkling",
        "vigilant"
    ]

    const getRandomEmotion = () => {
        return emotionList[Math.floor(Math.random() * emotionList.length)];
    }

    const changeGroupName = (e) => {
        if(groupNameValidation.test(e.target.value)){
            groupName = e.target.value;
        }else{
            groupName = e.target.value.replaceAll('/[^a-zA-Z]{2,16}/', '');
        }
    }

    /**
    * @type {HTMLInputElement | null}
    */
    let quietInputFileElement;
    /**
    * @type {HTMLInputElement | null}
    */
    let speakInputFileElement;
    /**
    * @type {FileList}
    */
    let quietFiles;
    /**
    * @type {FileList}
    */
    let speakFiles;
    /////////////////
    // BLINK STUFF //
    /////////////////
    /**
     * @type {HTMLInputElement | null}
     */
    let quietBlinkInputFileElement;
    /**
     * @type {HTMLInputElement | null}
     */
    let speakBlinkInputFileElement;
    /**
    * @type {FileList}
    */
    let quietBlinkFiles;
    /**
    * @type {FileList}
    */
    let speakBlinkFiles;

    $: readyForAction = quietFiles?.length 
        && quietFiles.length > 0 
        && speakFiles?.length
        && speakFiles.length > 0 
        && groupName 
        && groupNameValidation.test(groupName)
        && (
            !blinks 
            || (quietBlinkFiles?.length 
                && quietBlinkFiles.length > 0 
                && speakBlinkFiles?.length
                && speakBlinkFiles.length > 0));

    /**
     * This is what happens when you drop and image into the file input
     * @param {CustomEvent<any> & { dataTransfer?: DataTransfer | undefined; }} e HTMLInputElement's event that is fired when the user uploads a file
     */
    const dropImage = (e) => {
        e.preventDefault();
        console.log("HEY!  YOU DROPPED THIS:", e)

        const transferredFiles = Array.from(e?.dataTransfer?.files ?? []);
        // Ensures all files are of a valid file type before adding them to the uploadedFiles array
        if(transferredFiles.every((file) => {
            const fileExtension = file.name.split(".").pop();
            return (fileExtension === "png" || fileExtension === "jpg" || fileExtension === "jpeg" || fileExtension === "gif");
        })){
            // This is NOT the ideal way to do this and I'm sure it's buggy, but we're doing the 80%, not the 20% right now
            if(String(e.target.id).includes("quiet-blink")){
                console.log("Setting quiet blink files to ", e?.dataTransfer?.files);
                quietBlinkFiles = e?.dataTransfer?.files;
            }else if(String(e.target.id).includes("speak-blink")){
                console.log("Setting speak blink files to ", e?.dataTransfer?.files);
                speakBlinkFiles = e?.dataTransfer?.files;
            }else if(String(e.target.id).includes("quiet")){
                console.log("Setting quiet files to ", e?.dataTransfer?.files);
                quietFiles = e?.dataTransfer?.files;
            }else if(String(e.target.id).includes("speak")){
                console.log("Setting speak files to ", e?.dataTransfer?.files);
                speakFiles = e?.dataTransfer?.files;
            }
        }
    }
</script>

<!-- TODO: Add a check to see if the user has too many images.  If they do, stop them from uploading. -->
{#if false}
    <div
        id="upload-container"
        class="h-full w-full flex flex-col align-center justify-center items-center" 
    >
        <div id="upload-box" class="bg-[#99CCFF] flex flex-col px-7 py-4 text-center">
            <h1 class="text-2xl underline mb-1"><strong>{user}</strong> has too many images</h1>
        </div>
    </div>
{:else}
    <form
        id="upload-container"
        class="h-full w-full flex flex-col align-center justify-center items-center" 
        method="POST"
        enctype="multipart/form-data"

        action="?/upload"
        use:enhance
        on:dragover={(e) => { e.preventDefault(); }} 
        on:drop={dropImage}
    >
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div id="upload-box" class="bg-[#99CCFF] flex flex-col px-7 py-4 text-center">
            <h1 class="text-3xl font-bold underline mb-1">Upload</h1>
            <label for="group-name" class="mb-1">One word to describe this version of {user}:</label>
            <input id="group-name" type="text" name="groupName" placeholder={getRandomEmotion()} bind:value={groupName} on:input={changeGroupName} pattern="[a-zA-Z]*" required/>
            <label class="inline-flex items-center cursor-pointer p-2">
                <input type="checkbox" class="sr-only peer" name="blinks" bind:checked={blinks}>
                <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                <span class="mx-3">Does this {user} blink? {blinks ? "Yes" : "No"}</span>
            </label>
            <div>
                <div class="flex justify-between">
                    <div class="w-1/2" on:dragover={(e)=>{e.preventDefault()}} id="quiet-container">
                        <label for="file-upload-quiet" class="whitespace-nowrap flex flex-col items-center justify-center" id="quiet-label">
                            {#if quietFiles?.[0]}
                                QUIET FILE
                                <img id="quiet-image" alt={`${groupName} quiet`} width=150 height=150 src={URL.createObjectURL(quietFiles?.[0])} class="h-[unset]"/>
                            {:else}
                                When {user} is quiet
                                <span class="w-full flex flex-col border-2 border-dashed rounded-xl cursor-pointer" id="quiet-prompt">
                                    <span class="text-6xl" id="quiet-plus">+</span>
                                    <span id="quiet-prompt-text">Click or Drop</span>
                                </span>
                            {/if}
                        </label>
                        <input id="file-upload-quiet" type="file" name="quietFileToUpload" class="w-[201px] bg-[#FF7400] hidden"
                        accept="image/*" on:dragover={(e)=>{e.preventDefault()}} bind:this={quietInputFileElement} bind:files={quietFiles} required/>
                    </div>
                    <span class="border mt-3 mx-2"/>
                    <div class="w-1/2" on:dragover={(e)=>{e.preventDefault()}} id="speak-container">
                        <label for="file-upload-speak" class="whitespace-nowrap flex flex-col items-center justify-center" id="speak-label">
                            {#if speakFiles?.[0]}
                                SPEAK FILE
                                <img id="speak-image" alt={`${groupName} speak`} width=150 height=150 src={URL.createObjectURL(speakFiles?.[0])} class="h-[unset]"/>
                            {:else}
                                When {user} speaks
                                <span class="w-full flex flex-col border-2 border-dashed rounded-xl cursor-pointer" id="speak-prompt">
                                    <span class="text-6xl" id="speak-plus">+</span>
                                    <span id="speak-prompt-text">Click or Drop</span>
                                </span>
                            {/if}
                        </label>
                        <input id="file-upload-speak" type="file" name="speakFileToUpload" class="w-[201px] bg-[#FF7400] hidden"
                        accept="image/*" on:dragover={(e)=>{e.preventDefault()}} bind:this={speakInputFileElement} bind:files={speakFiles} required/>
                    </div>
                </div>
                {#if blinks}
                    <div class="flex justify-between">
                        <div class="w-1/2 border-t-2 mt-2" on:dragover={(e)=>{e.preventDefault()}} id="quiet-blink-container">
                            <label for="file-upload-quiet-blink" class="whitespace-nowrap flex flex-col items-center justify-center" id="quiet-blink-label">
                                {#if quietBlinkFiles?.[0]}
                                    QUIET BLINK FILE
                                    <img id="quiet-blink-image" alt={`${groupName} quiet blink`} width=150 height=150 src={URL.createObjectURL(quietBlinkFiles?.[0])} class="h-[unset]"/>
                                {:else}
                                    When {user} is quiet and blinks
                                    <span class="w-full flex flex-col border-2 border-dashed rounded-xl cursor-pointer" id="quiet-blink-prompt">
                                        <span class="text-6xl" id="quiet-blink-plus">+</span>
                                        <span id="quiet-blink-prompt-text">Click or Drop</span>
                                    </span>
                                {/if}
                            </label>
                            <input id="file-upload-quiet-blink" type="file" name="quietBlinkFileToUpload" class="w-[201px] bg-[#FF7400] hidden"
                            accept="image/*" on:dragover={(e)=>{e.preventDefault()}} bind:this={quietBlinkInputFileElement} bind:files={quietBlinkFiles} required/>
                        </div>
                        <span class="border mt-3 mx-2"/>
                        <div class="w-1/2 border-t-2 mt-2" on:dragover={(e)=>{e.preventDefault()}} id="speak-blink-container">
                            <label for="file-upload-speak-blink" class="whitespace-nowrap flex flex-col items-center justify-center" id="speak-blink-label">
                                {#if speakBlinkFiles?.[0]}
                                    SPEAK BLINK FILE
                                    <img id="speak-blink-image" alt={`${groupName} speaking blink`} width=150 height=150 src={URL.createObjectURL(speakBlinkFiles?.[0])} class="h-[unset]"/>
                                {:else}
                                    When {user} speaks and blinks
                                    <span class="w-full flex flex-col border-2 border-dashed rounded-xl cursor-pointer" id="speak-blink-prompt">
                                        <span class="text-6xl" id="speak-blink-plus">+</span>
                                        <span id="speak-blink-prompt-text">Click or Drop</span>
                                    </span>
                                {/if}
                            </label>
                            <input id="file-upload-speak-blink" type="file" name="speakBlinkFileToUpload" class="w-[201px] bg-[#FF7400] hidden"
                            accept="image/*" on:dragover={(e)=>{e.preventDefault()}} bind:this={speakBlinkInputFileElement} bind:files={speakBlinkFiles} required/>
                        </div>
                    </div> 
                {/if}
            </div>
        </div>
        {#if readyForAction }
            <button type="submit">Submit</button>
        {/if}
    </form>
{/if}
<style>
    button{
        border: 1px solid black;
        padding: 2px 5px;
        background: red;
        color: white;
        width: 100%;
    }
</style>
