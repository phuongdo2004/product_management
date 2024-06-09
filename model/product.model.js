// tao model de choc vao database
// ghi la Product thi nngam dinh no tham so t3 no chay vao Products 
// neu ko phai la Products thi ghi them tham so t3

// Product la ten model
//  cai thu 2 la schema
// products la ten connection
const mongoose = require("mongoose");
// trong mongoose co Schema nhung vao 
// const { Schema } = mongoose;
// object cua js ko dc dien cac gia trii nhu nay vao nen phai khoi taoo 1 bien Schema
// cung co the viet la new mongoose.Schema({...}) ko can nhung Scema vao vi trong mongoose co Schema
 const ProductShema = new mongoose.Schema({
        title: String,
        description: String,
        price: Number,
        discountPercentage: String,
        stock:Number,
        thumbnail: String,
        status: String,
        position: Number,
        deleted: Boolean    
    
});

const Product = mongoose.model('Product' , ProductShema , "products");
module.exports.test = Product;