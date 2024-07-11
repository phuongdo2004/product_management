
// ./ la di den thu muc cung cap
const dashboardRoute = require("./dashboard.route");
const productRouter = require("./product.route");
const dustbinRouter = require("./dustbin.route");

const systemConfig = require("../../config/system");


const path = "admin";

module.exports = (app)=>{

    app.use(`/${systemConfig.prefixAdmin}/dashboard`, dashboardRoute);
    app.use(`/${systemConfig.prefixAdmin}/products`, productRouter);
    app.use(`/${systemConfig.prefixAdmin}/dustbin` ,dustbinRouter );
}



// const homeRoute = require("./home.route");
// const productRoute = require("./products/product.route"); 
// module.exports.index= (app)=>{
//    app.use("/" , (homeRoute));
//    app.use("/product" , (productRoute));
// }