
module.exports.index= (req , res)=>{
    // mac dinh di vao folder view la ko can  j ca
    res.render("admin/pages/dashboard/index" , {
        pageTitle:"tranng chu"
    });



}