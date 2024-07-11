const express = require("express");
const router = express.Router();

const controller = require("../../controllers/admin/dustbin.controller");


router.get("/" , controller.index);
router.patch("/recover/:id" , controller.recover);
router.patch("/deletefe" , controller.deletefe);

module.exports  = router;