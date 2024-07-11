const Products = require("../../model/product.model");
const systemConfig = require("../../config/system");

module.exports.index = async (req , res)=>{

    // const product = await Products.find({deleted:true});
    const paginationHelper = require("../../helpers/pagination.helper");
// neu goi cai ham co sync await thi goi nos phai co await de no cho doi

const find = {
    deleted:true
}
const listStatus =[
    {
        value : "", 
        lable : "Tat ca"
    },
    {
        value : "active", 
        lable : "Hoat dong"
    },
    {
        value : "inactive", 
        lable : "Dung hoat dong"
    }
]; 
 const pagination = await paginationHelper(req ,find);
 const product = await Products
 .find(find)
 // gioi han so pt in ra moi trang
 .limit(pagination.limitItem)
 // ham .skip la bo qua bn pha tu
 .skip( pagination.skip)
 // sap xep theo vi tri asc => tang desc => giam
 .sort({
    position:"desc"
 });
   // macc dinh di vao thu muc views la ko can ../ ( se bi sai)
    res.render("admin/pages/products/dustbin.pug" , {
        pagetitle :"thung rac",
        products :product,
        listStatus :listStatus,
        pagination:pagination

       
    });





}

// khoi phuc
module.exports.recover = async (req ,res)=>{
    const id = req.params.id;
    console.log(id);
    await Products.updateOne({
        _id:id
    }, {
        deleted:false
    });
    res.json(
        {
            code:200
        }
    );
}

module.exports.deletefe = async (req , res )=>{

    // const id = req.body.id;
    // console.log(id);

console.log("hello");

}