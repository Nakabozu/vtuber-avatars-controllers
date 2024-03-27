<script>
    export let data;
    const user = data.user;

    let showLinks = false;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<nav
    id="page-select-container"
    class="w-full flex flex-col items-center bg-[#99CCFF]"
    on:click={()=>{
        showLinks=!showLinks;
    }}
    on:mouseenter={()=>{
        showLinks=true;
    }}
    on:mouseleave={()=>{
        showLinks=false;
    }}
>
    {#if showLinks}
        <a href={`/${user}/upload`} class="py-2 border-b border-stone-200">↑ Upload Avatars ↑</a>
        <a href={`/${user}/control`} class="py-2 border-b border-stone-200">🎮 Control Avatar 🎮</a>
        <a href={`/${user}/active`} class="py-2">🖼️ Active Avatar 🖼️</a>
    {:else}
        Navigate Elsewhere
    {/if}
</nav>
<slot/>

<style>
    nav{
        position: fixed;
        z-index: 2;
        top: 0;
        left: 0;
    }
</style>