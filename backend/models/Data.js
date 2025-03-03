import mongoose from "mongoose";


const itemSchema = new mongoose.Schema({
    name: String,
    Monitor: String,
    keyboard: String,
    ups: String,
    Mouse: String,
    Issue: String,
    date:String,
    AssignTo: String,
    Room:String,
    Sys:String
  });
const filteredSchema = new mongoose.Schema({
    date: String,
    filteredItems: [itemSchema],
    namee:String
  });
  export const dataa = mongoose.model("IssueFixed",filteredSchema);