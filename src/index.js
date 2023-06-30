const app = require("./app");


const dotenv = require('dotenv')
dotenv.config();
let port;

port = process.env.PORT || 5060;

app.listen(port, () => {
    console.log(`The server is listening on port ${port}`);}
)