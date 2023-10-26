import {get} from './requester'

export async function exerciseSearch(exerciseNameQuery){
    
    try{
        const response = await get(`workouts/search_exercise/?name=${exerciseNameQuery}`);

        if (!response.ok){
            throw new Error('Network response was not ok!');
        };

        return response.json();
    } catch(error){
        throw error
    }
}