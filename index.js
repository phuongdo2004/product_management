const express = require("express");
// nhung routteClient vao
const app = express();
const cookieParser = require('cookie-parser')
const  session = require('express-session');

var methodOverride = require('method-override');

// nhung express-flash de hien thi thong bao
const flash = require('express-flash');
app.use(cookieParser('keyboard cat'));
  app.use(session({ cookie: { maxAge: 60000 }}));
  app.use(flash());

// override with the X-HTTP-Method-Override header in the request
app.use(methodOverride('_method'));


// nhung body parse( phai nhung  trc routerAdmin de no chay tthi no dc tich hop san )
const bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))


// parse application/json
app.use(bodyParser.json());

//nhung thu vien dotenv vao
require('dotenv').config()

const routeClient = require("./routes/client/index.route");


const routerAdmin = require("./routes/admin/index.route");
//bien 
const systemConfig = require("./config/system");
// const prefix = require("./config/system");

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

// dinh nghia r a1 bien co noi dung la admin de dung di dung lai n lan (chi dung trong nhung file pug thoi)
app.locals.prefixAdmin = systemConfig.prefixAdmin;

// upload image
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })



routeClient.index(app);
app.listen(port, ()=>{
    console.log(`App listenning on port ${port}`);
});