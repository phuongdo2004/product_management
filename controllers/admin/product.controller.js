const Products = require("../../model/product.model");
const systemConfig = require("../../config/system");
const Product = require("../../model/product.model");

module.exports.dustBin = async (req , res)=>{

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

module.exports.index = async( req ,res) => {
    // dinh nghia ra object de dung ham find 
    const find = {
        deleted:false

    };
    
    // lay ra phan try van ma FE gui len sau dau ?
    // console.log(req.query.status);
// check trang thai ma FE gui len
//duung bien status de loc phan hoat dong & ko hoat dong

    if(req.query.status){
        find.status = req.query.status;
    }

    
// delete

if(req.query.delete){
    console.log(req.query.delete);
    await Products.updateOne(
       {
           // dieu kien de truy van ra obj
           _id:req.query.delete
           
       },
        {
           // gia tri cua obj can thay doi
           delete:true

       })

}

   
    //chuc nang tim kiem
    let keyword = req.query.keyword;
    // ham RegExp la tim kiem tuong tu cac tu khoa tuong tu
    // tin tieu them ve regexp
    const regex = new RegExp(req.query.keyword , "i")
    if( req.query.keyword){
        find.title= regex;
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
//phan trang 
const paginationHelper = require("../../helpers/pagination.helper");
// neu goi cai ham co sync await thi goi nos phai co await de no cho doi

 const pagination = await paginationHelper(req ,find);

 const products = await Products
 .find(find)
 // gioi han so pt in ra moi trang
 .limit(pagination.limitItem)
 // ham .skip la bo qua bn pha tu
 .skip( pagination.skip)
 // sap xep theo vi tri asc => tang desc => giam
 .sort({
    position:"desc"
 });

    res.render("admin/pages/products/index" , {
        pageTitle: "Quản lý sản phẩm",
        products :products,
        listStatus :listStatus,
        pagination:pagination
    });
   
}
// changeStatus
module.exports.changeStatus = async(req , res)=>{
    try{
                req.flash('success', 'Cập nhật trạng thái thành công');
            // cu phap pha vo cau truc thanh cac cap key- value
            const{ statusChange , id} = req.params;
            // console.log(`${id} : ${status}`)
            // cap nhat lai 1 ba ghi len tranng mongoose doc docs
            await Products.updateOne(
                {
                    // dieu kien de truy van ra obj
                    _id:id
                },
                {
                    // gia tri cua obj can thay doi
                    status : statusChange

                });


        // back de khi load lai trang khi thay doi trang thai thi no se back ve lai trang ma ta gui yeu cau di

        // res.redirect(`/${systemConfig.prefixAdmin}/products`);
                // chhhuyen ve lai trang khac nhung phan req m res doc docs o express
        // res.redirect('back');
        // res.json() chuyen js thanh json ( res.json() tra data ve cho file js FE con res.render() tra datta ve choo index.pug)
        res.json({
            code:200
        });


    }catch(error){
        req.flash("error" , "Id ko hop le ");
    }
    // req.params la 1 obj chu nhieu tham so dong co cac cap key value
    
}

// changeMulti

module.exports.changeMulti = async (req, res) => {
    try{
        const { status, ids } = req.body;
    // req.body ta nhan dc 1 chuoi js vi trong file index ta nhung body.parser.jsonn() nen nnno chuyen r 
//   await Products.updateMany({
//                 _id: ids
//                 }, {
//                 status: status
//             });

    switch(status){
        case "active":
        case "inactive":
            await Products.updateMany({
                _id: ids
                }, {
                status: status
            });
            break;
        case "delete":
            await Products.updateMany({
                _id:ids
            } , {
                deleted:true
            });
            break;
        default:
            break;


    }

    
    res.json({
      code: 200
    });
    }catch(error){
        req.flash("error" , "thong bao loi");

    }
    

}
// delete tam thoi
module.exports.delete = async(req , res) =>{
    try{
         const id = req.body.id;
    const deleted = req.body.deleted;
    req.flash('deleted', 'Xóa thành công');
    
    console.log(id);
    await Products.updateOne({
            _id : id
    } , {
        deleted:deleted
    });
    res.json({
        code:200
    });

    }catch(error){
        req.flash("error" , "Id ko hop le");
    }
   
}
// foreverDelete
module.exports.foreverDelete = async (req , res)=>{
    try{
            const id  = req.body.id;
        // console.log(id);
        console.log(req.body);

    await Products.deleteOne({
            _id :id
        });
        // chuyen js thanh json
        res.json({
            code :200
        });

    }catch(error){
        req.flash("error" , "Id ko hop le");
    }
    

}
module.exports.deleteItem = async (req, res) => {
    try{
            const id = req.params.id;
        console.log(id);
        await Products.deleteOne({
        _id: id
        });
    
        res.json({
        code: 200
        });
    }catch(error){
        req.flash("error" , "Id ko hop le");
    }
 
}
// change Position
module.exports.changePosition = async (req , res)=>{
    try{
        const id = req.params.id;
            const position= req.body.position;

            console.log(id);
            console.log(position);
        


            await Products.updateOne({
                _id :id,
            },{
                position:position
            }
        );
            res.json({
                code:200
            });
    }catch(error){
        req.flash("error" , "Id ko hop le");
    }
   

}
// Create
module.exports.create = async(req, res)=>{
    res.render("admin/pages/products/create" , {
        pageTitle: "Thêm mới sản phẩm"
       
      
    });
}


module.exports.createPost = async(req, res , next)=>{
   // bat su kien title trống thì hiện ra 1 alter
   
    // console.log(req.file);
    
        if(req.file && req.file.filename) {
            req.body.thumbnail = `/uploads/${req.file.filename}`;
          }
         console.log(req.body.thumbnail);

    
    req.body.price= parseInt(req.body.price);
    req.body.discountPercent = parseInt(req.body.discountPercent);
    req.body.stock =parseInt(req.body.stock);
    if(req.body.position){
        req.body.position = parseInt(req.body.position);

    }else{
        req.body.position = await Products.countDocuments({})+1;

    }
 

    //tao 1 san pham moi
    const product = new Product(req.body);
    await product.save();
    // chuyen huong sang trang san pham
    res.redirect(`/${systemConfig.prefixAdmin}/products`);

}
module.exports.edit = async(req, res)=>{
try {
      const id = req.params.id;
    const item = await Products.findOne({
        _id:id, 
        deleted:false,
    });
    // console.log(item);
    res.render("admin/pages/products/edit" , {
        pageTitle: "Chỉnh sửa sản phẩm" , 
        item :item,
    });
} catch (error) {

    req.flash("error" , "Id sản phẩm ko tồn tại");
    res.redirect(`/${systemConfig.prefixAdmin}/products`);
  
}
  



}
module.exports.editPatch = async (req , res)=>{
    
        try{
                const id = req.params.id;
                if(req.file && req.file.filename) {
                    req.body.thumbnail = `/uploads/${req.file.filename}`;
                }
            req.body.title = req.body.title;
            req.body.description =req.body.description;
            req.body.price =parseInt(req.body.price);
            req.body.discountPercentage =parseInt(req.body.discountPercentage);
            req.body.stock = parseInt(req.body.stock);
            if( req.body.position){
                req.body.position = parseInt(req.body.position);
            }else{
                const cnt = await Products.countDocuments({deleted:false});
                req.body.position = cnt +1;
            }
            req.body.status =req.body.status;

            await Products.updateOne(  
                {
                    _id:id,
                } ,req.body             
            )
            // back lai trang cu la trang chinh sua
            req.flash('success' , 'Cập nhật thành công');
      }catch(error){
            req.flash("error" , "Id sản phẩm ko tồn tại");
      }
        res.redirect("back");
   

}

// [GET] /admin/products/detail/:id
module.exports.detail = async (req, res) => {
    try {
      const id = req.params.id;
  
      const item = await Product.findOne({
        _id: id,
        deleted: false
      });
  
      if(item) {
        res.render("admin/pages/products/detail", {
          pageTitle: "Chi tiết sản phẩm",
          item: item
        });
      } else {
        res.redirect(`/${systemConfig.prefixAdmin}/products`);
      }
    } catch (error) {
      res.redirect(`/${systemConfig.prefixAdmin}/products`);
    }
  }