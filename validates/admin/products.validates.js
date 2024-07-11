module.exports.title = async(req , res , next)=>{
    
    if(!req.body.title){ 
       
        req.flash("error" , "Tiêu đề ko đc để trống");
        
        console.log("hi");
        // khi nhân sstaoj mới gọi lại trang vừa nhấn để hiện ra
        res.redirect("back");
        // de no ko chay xuong code ben duoi nu
        return;
    }
    next();
    // vi co next thi no next chay sang ham tiep theo la ham controller
    // neu ko co thi no ko next sang controller ddc

}