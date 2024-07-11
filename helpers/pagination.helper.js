const Products = require("../model/product.model");

module.exports =async(req , find)=> {

    const pagination ={
        currentPage :1,
        limitItem :4
     };
 
     const countProducts = await Products.countDocuments(find);
     pagination.totalPage = Math.ceil(countProducts/pagination.limitItem);
     
 
     if( req.query.page){
         // req.qury tra va chuoi ne vai convert ve dang so de tinh toan 
 
         pagination.currentPage = parseInt(req.query.page);
         console.log(pagination.currentPage);
     
     }pagination.skip  = (pagination.currentPage-1)*pagination.limitItem;
 

         // phai return ve object vi nhung bien o trong ham chi dung dc trong ham thoi

         return pagination;

}