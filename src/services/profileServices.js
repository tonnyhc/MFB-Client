import { get } from "./requester";

export async function userProfileRequest(){
    const requestURL = 'profile/user-profile'
    try{
        const data = await get(requestURL);
        return data;
    } catch(error){
        throw error;
    }
}