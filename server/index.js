const express = require('express');
require('dotenv').config();

const app = express();


app.use(express.json());

const port = process.env.PORT || 5500;


app.get('/', (req, res) => {
    res.send( 'Server is running')
})


//Start server
app.listen(port, ()=> {
    console.log(`Server is running on port ${port}`);
    
})