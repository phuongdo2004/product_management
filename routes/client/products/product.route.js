
const express = require("express");
const router = express.Router();
const productController = require("../../../controllers/client/product.controller"); 
    router.get("/" ,productController.index);


    module.exports= router;
//
//     const express = require("express");
// const router = express.Router();

//     router.get("/" , (req , res)=>{
//         res.render("client/pages/home/index");
//     });
  
//   module.exports= router;
