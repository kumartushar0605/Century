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
   

    
})


export const User = mongoose.model("Issues",schema);