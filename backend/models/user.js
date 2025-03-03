import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name:{
        type:String,
        // required:true,
    } ,
    email:{
        type:String,
        // required:true,
    },
    password:{
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
    Moniter:{
        type:String
    },
    keyboard:{
        type:String
    },
    Mouse:{
        type:String
    },
    ups:{
        type:String
    }
    ,
    cpu:{
        type:String
    },
    remarks:{
        type:String
    },
    pcType:{
        type:String
    }
})


export const User = mongoose.model("EmployeeDetails",schema);