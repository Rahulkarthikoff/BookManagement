const express = require('express')
const Book = require('../models/bookModels')

const router = express.Router();

router.get('/', async (req,res) => {
    console.log(res, "Rahul")
    try{
        const books = await Book.find();

        res.status(200).json(books);
    }catch(err){
        console.log("Error fetching books:" , err)
        res.status(500).json({ message : "Error fetching books", err})
    }

})

router.get('/:id', async (req,res) => {
    try{
        const books = await Book.findById(req.params.id)
        if(!books){
            return res.status(404).json({message : "Id not found",err:err.message})
        }
        res.status(500).json(books);
    }catch(err){
        console.log("Error fetching Books:" ,err)
        res.status(500).json({message : "Error fetching books", err})
    }
})

router.post('/', async (req,res)=>{

    try{
        const { name, author } = req.body;
        if(!name || !author ){
            return res.status(400).json({ message: "Name and Author are required"});
        }

        const newbook = new Book({name,author});
        await newbook.save();

        res.status(200).json(newbook);
    }catch(err){
        console.log("Error creating book:", err);
        res.status(500).json({message : "Error Creating NewBook"});
    }
});

router.put('/:id', async (req,res)=>{
    try{
        const {name, author} = req.body;
        const updateBook = await Book.findByIdAndUpdate(req.params.id, {name,author},{new:true,runValidators:true});

        res.status(200).json(updateBook)
    }catch(err){
        res.status(404).json({mesaage : "Error in Updating the Book by its Id",err : err.message});
    }
});

router.delete("/:id", async (req,res)=>{
    try{
        const deleteBook = await Book.findByIdAndDelete(req.params.id);
        if(!deleteBook){
            return res.status(404).json({message:"Book not found"});
        }
        res.status(200).json(deleteBook);
    }catch(err){
        res.status(404).json({message : "Error updating the document",err:err.message});
    }
})

module.exports = router;