<script>
    export let data;
    const user = data.user;
</script>

<article
    id="page-select-container"
    class="h-full w-full flex flex-col align-center justify-center items-center" 
>
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div id="page-select-box" class="bg-[#99CCFF] flex flex-col px-7 py-4 text-center">
        <h1 class="text-3xl font-bold underline mb-1">Welcome {user}</h1>
        <a href={`/${user}/upload`}>↑ Upload Avatars ↑</a>
        <span class="border-y-2 mx-[-80px] my-1 py-[0.5px]"/>
        <a href={`/${user}/control`}>🎮 Control Avatar 🎮</a>
        <span class="border-y-2 mx-[-80px] my-1 py-[0.5px]"/>
        <a href={`/${user}/active`}>🖼️ Active Avatar 🖼️</a>
    </div>
</article>