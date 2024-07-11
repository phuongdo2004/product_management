
const homeRoute = require("./home.route");
const productRoute = require("./products/product.route"); 
module.exports.index= (app)=>{
   app.use("/" , (homeRoute));
   app.use("/products" , (productRoute));
}