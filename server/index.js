const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();


app.use(express.json());

const port = process.env.PORT || 5500;


app.get('/', (req, res) => {
    res.send( 'Server is running')
})

//DB Connection
connectDB();

//Start server
app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
    
})