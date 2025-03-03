import mongoose from "mongoose";

const schema = new mongoose.Schema({
    empId:{
      type:String  
    },
    name:{
        type:String,
        // required:true,
    } ,
    email:{
        type:String,
        // required:true,
    },
    dob:{
        type:String,
        // require:true
    },
    doj:{
        type:String,
        // require:true
    },
    dor:{
        type:String,
        // require:true
    },
    Address:{
        type:String,
        // require:true
    },
    roomNo:{
        type:String
    },
    systemNo:{
        type:String
    },
    
    
})


export const EMP = mongoose.model("employe",schema);