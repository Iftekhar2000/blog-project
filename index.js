const dotenv = require('dotenv').config()
const app = require('./app');



app.listen(process.env.PORT, ()=>{
    `server running on port ${process.env.PORT}`
})