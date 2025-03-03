import { User } from "../models/user.js";

export const register = async(req,res)=>{
  const { name, email,dob,doj,dor, Address,roomNo,systemNo,Moniter,Mouse,keyboard,ups,Cpu,remarks,pcType} = req.body;
  console.log(name + " " + email)

    const user = await User.findOne({email});

  if(user){
    return res.status(404).json({
      success:false,
      message:"User already exists"
    })
  } 
    try {
     
      const newUser = new User({ name, email,dob, doj, dor, Address,roomNo,systemNo,Moniter,Mouse,keyboard,ups,cpu:Cpu,remarks,pcType});
      await newUser.save();
      // res.status(201).json(newUser); // Optional: respond with the created user object
      res.status(201).json({ success:"inventory alloted" });

    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Registration failed' });
    }
}

export const login = async(req,res)=>{

  const {name,roomNo,systemNo}=req.body;
  console.log(name);

  try{
    const user = await User.findOne({name,roomNo,systemNo})

    if (user) {
      res.json({ success: true, user:user });
    } else {
      res.json({ success: false });
    }

  }catch(error){
  console.log(error)
  }
}
export const inventory = async(req,res) =>{
  const {email}= req.params;
  console.log(email)
  const userr = await User.findOne({email});
  console.log(userr.name);
  try{
    if (!userr) {
      return res.status(404).json({ error: 'User not found' });
    }

    userr.Room = req.body.Room;
    userr.Sys = req.body.Sys;
    userr.Moniter = req.body.Moniter;
    userr.keyboard = req.body.keyboard;
    userr.Mouse = req.body.Mouse;
    userr.ups = req.body.ups;
    
    await userr.save();
    
     res.status(201).json({
      success:true,
      message:"Inventory Submmited"
    })

  }catch(error){
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed' });
  }
}

export const getMyProfile = async(req,res) =>{
  const {name,roomNo,systemNo}=req.body;

  try{
    const user = await User.findOne({name,roomNo,systemNo})

    if (user) {
      res.json({ success: true  , user:user});
    } else {
      res.json({ success: false });
    }

  }catch(error){
  console.log(error)
  }
}



export const inventory2 = async(req,res) =>{
  const {name,roomNo,systemNo}= req.query;
  const userr = await User.findOne({name,roomNo,systemNo});
  console.log(userr.name);
  try{
    if (!userr) {
      return res.status(404).json({ error: 'User not found' });
    }
   const {selectedField,updatedData} = req.body;
   console.log(selectedField + " " + updatedData)
   
   if(selectedField==="moniter"){
    console.log("moniter is here")
    userr.Moniter = updatedData; 
   }else if(selectedField==="mouse"){
    userr.Mouse=updatedData;
   }else if(selectedField==="keyboard"){
    userr.keyboard=updatedData;
   }else if(selectedField==="ups"){
    userr.ups=updatedData;
   }

  
    
    await userr.save();
    
     res.status(201).json({
      success:true,
      message:"Inventory Updated"
    })

  }catch(error){
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed' });
  }
}