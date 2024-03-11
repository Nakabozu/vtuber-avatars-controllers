// @ts-nocheck

// NOTE TO SELF:
// The data in here doesn't go directly to +page.svelte
// You have to pass it into the load function in +page.js and then pass that into the return there.
export const load = ({ params, data }) => {
    // This is an object that the +page.svelte file gets access to via the data prop.  You can put whatever you like in it.
    return {
        user: params.user,
        ...data
    }
}