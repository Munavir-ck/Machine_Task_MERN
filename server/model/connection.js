import mongoose from "mongoose"

mongoose.set("strictQuery", false);



const dbConnection=function (cb){
    mongoose.connect(process.env.MYDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(()=>{
        console.log("connection success");
        cb(true)
    }).catch((err)=>{
        console.log(err);
        cb(false)
    })
    
}
export default dbConnection