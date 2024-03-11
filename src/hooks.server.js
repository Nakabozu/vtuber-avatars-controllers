// @ts-nocheck
export const handle = async ({ event, resolve }) => {
    // TODO: MY CURRENT PROBLEM IS THAT I CAN't GET THIS SERVER-LOCAL TO UPDATE GLOBALLY!!! OR AT ALL!!!
    const { params } = event;

    //console.log("Handle event EVENT", event);
    console.log("Handle event PARAMS", params);

	const response = await resolve(event);
	return response;
};