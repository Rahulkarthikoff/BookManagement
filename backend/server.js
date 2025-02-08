const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const app = express();
const BookRoutes = require('./routes/BookRouter')

dotenv.config();
app.use(express.json())

connectDB();
app.use('/Book',BookRoutes);
// app.get('/', ((req,res)=>{
//     res.send("Hi Hello World");
//     res.end();
// }))

app.listen(process.env.PORT, (req,res)=>{
    console.log(`Server running at the port http://localhost:${process.env.PORT}`);
})