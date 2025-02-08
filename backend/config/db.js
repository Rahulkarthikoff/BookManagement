const mongoose = require('mongoose');
const dotenv = require('dotenv')
const express = require('express')
dotenv.config();


const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected");
    }catch(err){
        console.log("MongoDb Connection Error", err);
        process.exit(1);
    }
}


module.exports = connectDB;