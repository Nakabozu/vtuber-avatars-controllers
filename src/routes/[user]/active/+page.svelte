<script>
// @ts-nocheck
    // PROPS
    export let data;
    // IMPORTS
    const usersEmotions = data?.usersEmotions;
    // STATE
    const user = data.user;
    $: currentEmotion = usersEmotions[user];
    ////////////////////////////////////
    // GET LIST OF AVAILABLE EMOTIONS //
    ////////////////////////////////////
    let images;
    let emotionsSet = new Set();
    let emotionsArray = [];

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
    
    $: relativeImagesArray = Object.keys(images);
    $: imagesArray = relativeImagesArray.map((image)=>{
        return image.replace("../../../", "/src/")
    });
    // console.log("imagesArray", imagesArray);


</script>

<article
    id={`${user}-images`}
    class="h-full w-full flex flex-row gap-20 align-center justify-center items-center" 
>
{#if currentEmotion}
    {#if imagesArray.some((image)=>{
        return image.includes(currentEmotion);
    })}
    <div class="flex flex-row">
        {#each imagesArray as image, index}
            <div class="flex flex-col justify-center align-middle text-center">
                {#if image.includes(currentEmotion)}
                    <img src={image} alt={`image-${index}`} width=250 height=250 class="h-[unset]"/>
                    {#if image.includes("quiet")}
                        Quiet
                    {/if}
                    {#if image.includes("speak")}
                        Speak
                    {/if}
                    {#if image.includes("blink")}
                        Blink
                    {/if}
                {/if}
            </div>
        {/each}
    </div>
    {:else}
        No images found with the selected emotion.  This should never happen. :/
    {/if}
{:else}
    No emotion selected
{/if}
</article>