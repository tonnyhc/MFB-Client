import { post } from "./requester";



export async function register(body){
    const registerURL = 'authentication/register/';
    try {
        const data = await post(registerURL, body);
        return data;
    } catch(error){
        throw error;
    }
}