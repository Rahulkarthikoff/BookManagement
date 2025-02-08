import axios from 'axios';
import { API } from './config'

export const getAllBook = async() =>{
    try{
        const res = await axios.get(API);
        return res.data;
    }catch(err){
        console.log(err);
    }
}