// tao model de choc vao database
// ghi la Product thi nngam dinh no tham so t3 no chay vao Products 
// neu ko phai la Products thi ghi them tham so t3

// Product la ten model
//  cai thu 2 la schema
// products la ten connection
const mongoose = require("mongoose");
slug = require('mongoose-slug-updater');
  mongoose.plugin(slug);
// trong mongoose co Schema nhung vao 
// const { Schema } = mongoose;
// object cua js ko dc dien cac gia trii nhu nay vao nen phai khoi taoo 1 bien Schema
// cung co the viet la new mongoose.Schema({...}) ko can nhung Scema vao vi trong mongoose co Schema
// slug

 const ProductShema = new mongoose.Schema({
        title: String,
        description: String,
        price: Number,
        discountPercentage: Number,
        stock:Number,
        thumbnail: String,
        status: String,
        position: Number,
        deleted: {
                type:Boolean,
                default:false
        },
        slug: { 
                type: String,
                 slug: "title" , 
                 unique: true ,
        },
        // slug (https://www.npmjs.com/package/mongoose-slug-updater)
    
    
} ,
 {
        // tu dong them truong createat va update at(https://mongoosejs.com/docs/timestamps.html)
 timestamps: true  });

const Product = mongoose.model('Product' , ProductShema , "products");
module.exports = Product;