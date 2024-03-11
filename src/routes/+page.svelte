<script>
    import { goto } from '$app/navigation';
    let userName = "";
    let validUsers = [
        "Naka",
        "Kuro",
        "Zuzu",
        "Ghost"
    ];
    const checkIfEnter = (e) => {
        if(e.key === "Enter"){onEnter()};
    }

    const onEnter = () => {
        if(validUsers.includes(userName)){
            goto(`/${userName}`);
        }
    }
</script>

<section id="sign-in-container" class="h-full w-full flex flex-col align-center justify-center items-center">
    <div id="sign-in-box" class="bg-[#99CCFF] flex flex-col px-7 py-4 text-center">
        <h1 class="text-3xl font-bold underline mb-1" >Who are you?</h1>
        <input type="text" placeholder="Name" on:keydown={checkIfEnter} bind:value={userName} 
            class="border-0 active:border-0 focus:border-0 outline-none active:outline-none focus:outline-none"/>
        <button class="bg-[#77AADD] button w-full" on:click={onEnter}>Enter</button>
    </div>
</section>
