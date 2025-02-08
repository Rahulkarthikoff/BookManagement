
import axios from 'axios';
import { API } from './config'

export const getBooks = async() =>{ 
    try{
        const res = await axios.get(API);
        return res.data;
    }catch(err){
        console.log("Error Fetching Books",err);
        return[];
    }
}
//POST;
export const addBook = async(data)=>{
    try{
        const res = await axios.post(API,data);
        return res.data;
        // return res.json({message : "Book added Successfully"})
    }catch(err){
        console.log("Error adding books:",err.message);
    }
}

//PUT;
export const updateBook = async(id,updatedBook) => {
    try{
        const res = await axios.put(`${API}/${id}`,updatedBook);
        return res.data;
    }catch(err){
        console.error("Error Updating book:", err.message);
    }
}


export const deleteBook = async(id) => {
    try{
        const res = await axios.delete(`${API}/${id}`);
        return res.data;
    }catch(err){
        console.error("Error Deleting book:", err.message);
    }
}