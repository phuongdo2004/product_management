
// ./ la di den thu muc cung cap
const dashboardRoute = require("./dashboard.route");
// const productRouter = require("./product.route");
module.exports = (app)=>{
    app.use("/admin/dashboard", dashboardRoute);
    // app.use("/admin" , productRouter);

}



// const homeRoute = require("./home.route");
// const productRoute = require("./products/product.route"); 
// module.exports.index= (app)=>{
//    app.use("/" , (homeRoute));
//    app.use("/product" , (productRoute));
// }