const express = require("express");
// nhung routteClient vao
const app = express();
//nhung thu vien dotenv vao
require('dotenv').config()
const routeClient = require("./routes/client/index.route");
const routerAdmin = require("./routes/admin/index.route");

routerAdmin(app);


// nhung thu vien dotenv vao du an
// require('dotenv').config();// ham config() de oad cau hinh len
const mongoose = require('mongoose');
// ket noi
mongoose.connect(process.env.MONGO_URL);

// process.env.ten bien trong file .ev

//mac dinh di den thu muc views
app.set("views" , "./views");
// dinh nghia template engine
app.set("view engine" , "pug");
// nhung file tinnh neu muon truy ccap thi chi can / la di vao thu muc public r vd(/css/style)

app.use(express.static('public'));
// lay bien PORT trong file env ra 
const port   = process.env.PORT;

// ./ ;a di vao foledr cong cap
// nhung file database xem ket noi thanh cong chua
const database = require("./config/database")
database.connect();
// day la  file kindex.route goi ham


const model = require("./model/product.model");




routeClient.index(app);
app.listen(port, ()=>{
    console.log(`App listenning on port ${port}`);
});