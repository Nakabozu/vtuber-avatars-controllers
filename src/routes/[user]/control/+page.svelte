<script>
    // @ts-nocheck
    import { local } from "$lib";
    /**
     * TODO: If you can, have the selectedEmotion be the current emotion when the page loads
     */
    ////////////////////////
    // YOU NEED THIS PART //
    ////////////////////////
    // A reserved prop which contains data from the API
    export let data;
    console.log("CLIENT DATA", data);
    const user = data.user;
    const usersEmotions = data?.usersEmotions;

    let startingEmotion = usersEmotions?.[user];
    let selectedEmotion = usersEmotions?.[user];

    ////////////////////////////////////
    // GET LIST OF AVAILABLE EMOTIONS //
    ////////////////////////////////////
    let images = {};
    let emotionsSet = new Set();
    let emotionsArray = [];

    if($local){
        switch (user) {
            case "Naka": 
                images = import.meta.glob('../../../lib/vtubers/Naka/*.(jpg|jpeg|svg|png)', {eager: true})
                break;
            case "Zuzu": 
                images = import.meta.glob('../../../lib/vtubers/Zuzu/*.(jpg|jpeg|svg|png)', {eager: true})
                break;
            case "Kuro":
                images = import.meta.glob('../../../lib/vtubers/Kuro/*.(jpg|jpeg|svg|png)', {eager: true})
                break;
            case "Ghost": 
                images = import.meta.glob('../../../lib/vtubers/Ghost/*.(jpg|jpeg|svg|png)', {eager: true})
                break;
        }
    }

    $: relativeImagesArray = Object.keys(images);
    $: imagesArray = $local ? 
        relativeImagesArray.map((image)=>{
            return image.replace("../../../", "/src/")
        })
        : data.imageLinks;

    $: emotionsArray = imagesArray?.map(imageSrc => {
        const fileName = imageSrc.split("/")[imageSrc.split("/").length-1]
        const thisEmotion = fileName.split("-")[0];
        return thisEmotion;
    });
    $: emotionsSet = new Set(emotionsArray);

    const slugify = (str = "") =>
        str.toLowerCase().replace(/ /g, "-").replace(/\./g, "");
</script>

<form
    id="sign-in-container"
    class="h-full w-full flex flex-col align-center justify-center items-center" 
    method="POST"
    enctype="multipart/form-data"

    action="?/changeEmotion"
>
    <div id="sign-in-box" class="bg-[#99CCFF] flex flex-col px-7 py-4 text-center">
        <h1 class="text-3xl font-bold underline mb-1">Which {user} are you?</h1>
        <div class="flex flex-row w-[315px]">
            <div class="w-1/3 flex flex-col gap-1 items-center">
                <!-- I don't know why the heck you can't set a variable to the emotionsSet.values() and then use that, but you can't.  It'll break. -->
                {#each emotionsSet.values() as emotion}
                    <input
                        type="radio"
                        name="selectedEmotion"
                        id={slugify(emotion)}
                        value={slugify(emotion)}
                        class="hidden"
                        bind:group={selectedEmotion}
                    />
                    <label for={slugify(emotion)} class={`w-full align-middle pb-4 pt-3
                        ${emotion === selectedEmotion ? "border-2 border-amber-50" : "border border-stone-500"}
                        ${emotion === startingEmotion ? "bg-gradient-to-r from-[#99CCFF] to-amber-50" : ""}
                    `}>
                        {emotion}
                    </label>
                {/each}
            </div>

            <div class="w-2/3 flex flex-col grow-1 items-center">
                <h2 class="text-lg text-center">Preview of new {user}</h2>
                {#if selectedEmotion}
                    <div class="grid grid-rows-2 grid-cols-2">
                        {#each imagesArray as image, index}
                            {#if image.includes(selectedEmotion)}
                                {#if !image.includes("blink")}
                                    <div class="flex flex-col justify-center align-middle row-start-1">
                                        <img src={image} alt={`image-${index}`} width=100 height=100 class="h-[unset]"/>
                                        {#if image.includes("quiet")}
                                            Quiet
                                        {/if}
                                        {#if image.includes("speak")}
                                            Speak
                                        {/if}
                                        {#if image.includes("blink")}
                                            Blink
                                        {/if}
                                    </div>
                                {/if}
                                {#if image.includes("blink")}
                                    <div class="flex flex-col justify-center align-middle row-start-2">
                                        <img src={image} alt={`image-${index}`} width=100 height=100 class="h-[unset]"/>
                                        {#if image.includes("quiet")}
                                            Quiet Blink
                                        {/if}
                                        {#if image.includes("speak")}
                                            Speak Blink
                                        {/if}
                                    </div>
                                {/if}

                            {/if}
                        {/each}
                    </div>
                {/if}
            </div>
        </div>
        <button type="submit" formaction="?/changeEmotion" class="w-full h-[50px] mt-5 border border-stone-500">Submit</button>
    </div>
</form>