const express = require("express");
const routeClient = require("./routes/client/index.route")
const app = express();

app.set("views" , "./views");
app.set("view engine" , "pug");

const port = 3000;


routeClient.index(app);
app.listen(port, ()=>{
    console.log(`App listenning on port ${port}`);
});