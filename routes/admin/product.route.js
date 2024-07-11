const express = require("express");
const router = express.Router();
// upload image
// upload image
const multer  = require('multer');
const controller = require("../../controllers/admin/product.controller");
// rename file
// tao ra nhung ten file duy nhat de tranhh de len nhau
const storageMulterHelper = require("../../helpers/storageMulter.helpers");

  
  const upload = multer({ storage: storageMulterHelper.storage });



router.get("/" ,controller.index );
// router.get("/dustbin" , controller.dustBin);
// :id la truyen tham so dong (la tham so co the thay doi theo gia tri)
router.patch("/change-status/:statusChange/:id" , controller.changeStatus);

router.patch("/change-multi", controller.changeMulti);
router.patch("/delete", controller.delete);
router.delete("/foreverDelete/" , controller.foreverDelete);

router.delete("/delete/:id", controller.deleteItem);
router.patch("/changePosition/:id" , controller.changePosition);
// router.patch("/changePosition" , controller.changePosition);
const validateTitle = require("../../validates/admin/products.validates");

// them moi
router.post(
  "/create", 
  upload.single('thumbnail'),
  // chay vao ham validate validate cx nhu ham controller
  validateTitle.title,
  controller.createPost
  
  );
router.get("/create" , controller.create);
// method get de lay giao dien hien thi ra trong trang edit
router.get("/edit/:id" , controller.edit);

// [patch edit]
router.patch(
  "/edit/:id", 
  upload.single('thumbnail'),
  validateTitle.title,
  controller.editPatch

);
//[GET detail product ]

router.get("/detail/:id", controller.detail);

module.exports =router;



