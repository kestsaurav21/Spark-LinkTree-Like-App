const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/user.routes');
require('dotenv').config();

const app = express();


app.use(express.json());
const port = process.env.PORT || 5500;


app.get('/test', (req, res) => {
    res.send( 'Server is running')
})

//user routes
app.use('/', userRoutes);

//DB Connection
connectDB();

//Start server
app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
    
})