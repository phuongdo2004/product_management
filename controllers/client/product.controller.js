
const Products = require("../../model/product.model");
const systemConfig = require("../../config/system");


module.exports.index =async (req , res)=>{
    const products = await Products.find({    
       deleted: false
    });
// them ca key moi nhung man hinh terminal ko hien thi dc nhwng key ta them moi
// nen muon xem thi mo devtool cua ben be (nodejs) ra co bieu tuong node o kiem tra

    for( const item of products){
        //tofixed() de lm tron
        item.prinew = item.price + (item.price *(item.discountPercentage/100)).toFixed();
    }
   
    
    res.render("client/pages/products/index" , {
        pageTitle:"trang ds sp",
        products:products
    });
}
// vi du tao them 1 file create ns trong rproduct.route

// module.exports.create = (req , res)=>{
//     res.render("client/pages/products/create");

// }
// [GET detail]
module.exports.detail = async (req, res)=>{{

    try {
            const slug = req.params.slug;
            const product  = await Products.findOne({
                slug :slug,
                deleted:false,

            });

            if(product){
                res.render("client/pages/products/detail" , {
                    pageTitle:"Chi tiết sản phẩm",
                    product:product,
                })
            }else{
                res.redirect(`/products`);

            }

        }
     catch (error) {
        res.redirect(`/products`);
    }
   }
}


