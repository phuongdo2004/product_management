
const mongoose = require('mongoose')

const ProductShema = {
    
}


module.exports.connect = async()=>{
    try {
        await  mongoose.connect(process.env.MONGO_URL);
        console.log("ket noi thanh cong");

    } catch (error) {
        console.log(error);
        console.log("ket noi that bai");        
    }
    
}