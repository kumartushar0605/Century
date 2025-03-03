import mongoose from "mongoose";

const schema = new mongoose.Schema({
    name:{
        type:String,
        // required:true,
    } , 
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
    },
    Issue:{
        type:String
    },
    date:{
        type:String
    },
    AssignedTo:{
        type:String
    },FixedDate:{
        type:String
    }
   

    
})


export const empStatus = mongoose.model("empStatus",schema);