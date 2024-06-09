
const Product = require("../../model/product.model");


module.exports.index =async (req , res)=>{
    const products = await Product.test.find({
       status: 'active',
       deleted: false
    });
// them ca key moi nhung man hinh terminal ko hien thi dc nhwng key ta them moi
// nen muon xem thi mo devtool cua ben be (nodejs) ra co bieu tuong node o kiem tra

    for( const item of products){
        //tofixed() de lm tron
        item.prinew = item.price + (item.price *(item.discountPercentage/100)).toFixed();
    }
    console.log(products);
    
    res.render("client/pages/products/index" , {
        pageTitle:"trang ds sp",
        products:products
    });
}
// vi du tao them 1 file create ns trong rproduct.route

// module.exports.create = (req , res)=>{
//     res.render("client/pages/products/create");

// }