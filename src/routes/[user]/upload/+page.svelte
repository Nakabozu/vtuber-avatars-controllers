<script>
// @ts-nocheck
    export let data;
    import { enhance } from '$app/forms';
    
    const user = data.slug;
    let groupName = '';
    let userName = user;
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
    /**
     * 
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
            if(String(e.target.id).includes("quiet")){
                console.log("Setting quiet files to ", e?.dataTransfer?.files);
                quietFiles = e?.dataTransfer?.files;
            }else if(String(e.target.id).includes("speak")){
                console.log("Setting speak files to ", e?.dataTransfer?.files);
                speakFiles = e?.dataTransfer?.files;
            }
        }
    }
</script>

<form
    id="sign-in-container"
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
    <div id="sign-in-box" class="bg-[#99CCFF] flex flex-col px-7 py-4 text-center">
        <input id="user-name" type="text" name="userName" class="hidden" bind:value={userName}/>
        <h1 class="text-3xl font-bold underline mb-1">Upload</h1>
        <label for="group-name" class="mb-1">One word to describe this version of {user}:</label>
        <input id="group-name" type="text" name="groupName" placeholder={getRandomEmotion()} bind:value={groupName} on:input={changeGroupName} pattern="[a-zA-Z]*" required/>
        <div class="flex justify-between">
            <div class="w-1/2" on:dragover={(e)=>{e.preventDefault()}} id="quiet-container">
                <label for="file-upload-quiet" class="mb-1" id="quiet-label">
                    {#if quietFiles?.[0]}
                        QUIET FILE
                        <img id="quiet-image" alt={`${groupName} quiet`} width=150 height=150 src={URL.createObjectURL(quietFiles?.[0])} class="h-[unset]"/>
                    {:else}
                        When {user} is quiet
                        <span class="flex flex-col border-2 border-dashed rounded-xl cursor-pointer" id="quiet-prompt">
                            <span class="text-6xl" id="quiet-plus">+</span>
                            <span id="quiet-prompt-text">Click or Drop</span>
                        </span>
                    {/if}
                </label>
                <input id="file-upload-quiet" type="file" name="quietFileToUpload" class="w-[201px] bg-[#FF7400] hidden"
                accept="image/*" on:dragover={(e)=>{e.preventDefault()}} bind:this={quietInputFileElement} bind:files={quietFiles} required/>
            </div>
            <span class="border my-3 mx-2"/>
            <div class="w-1/2" on:dragover={(e)=>{e.preventDefault()}} id="speak-container">
                <label for="file-upload-speak" class="mb-1" id="speak-label">
                    {#if speakFiles?.[0]}
                        SPEAK FILE
                        <img id="speak-image" alt={`${groupName} speak`} width=150 height=150 src={URL.createObjectURL(speakFiles?.[0])} class="h-[unset]"/>
                    {:else}
                        When {user} speaks
                        <span class="flex flex-col border-2 border-dashed rounded-xl cursor-pointer" id="speak-prompt">
                            <span class="text-6xl" id="speak-plus">+</span>
                            <span id="speak-prompt-text">Click or Drop</span>
                        </span>
                    {/if}
                </label>
                <input id="file-upload-speak" type="file" name="speakFileToUpload" class="w-[201px] bg-[#FF7400] hidden"
                accept="image/*" on:dragover={(e)=>{e.preventDefault()}} bind:this={speakInputFileElement} bind:files={speakFiles} required/>
            </div>
        </div>
    </div>
    {#if quietFiles?.length && quietFiles.length > 0 && speakFiles?.length && speakFiles.length > 0 && groupName && groupNameValidation.test(groupName) }
        <button type="submit" on:click={()=>{console.log("Form should do something...")}}>Submit</button>
    {/if}
</form>

<style>
    button{
        border: 1px solid black;
        padding: 2px 5px;
        background: red;
        color: white;
        width: 100%;
    }
</style>
