import { User } from "../models/report.js";
import { dataa } from "../models/Data.js";
import { UserAssign } from "../models/assign.js";
import { empStatus } from "../models/empStatus.js";
import { EMP } from "../models/Emp.js";

export const report = async(req,res)=>{
    const { name, roomNo , systemNo, Moniter , keyboard , Mouse , ups , Issue,datee,} = req.body;
   
    try{
      console.log(name)
      console.log(roomNo)
            const userr = await User.create({name,roomNo,systemNo,Moniter,keyboard,Mouse,ups,Issue,date:datee})
           await userr.save();
            res.status()
            res.status(201).json({
                success:true,
                message:"Issue Submmited"
            })
            console.log(roomNo)

    }catch(error){
        res.status(500).json({ error: 'Failed to report the issue' });
    }
}

export const issue = async(req,res)=>{
    const {AssignTo}= req.body;
    console.log(AssignTo+"ooooooo")
    
    try{
        const filteredItems = await User.find({AssignTo:AssignTo})
        res.json(filteredItems);
        
    }catch(error){
       res.status(500).json({error:'Failed'})
    }

}

export const Data = async(req,res) =>{
    const { date, filteredItems,namee } = req.body;
    console.log(date)
    console.log(filteredItems)
    try {
      const newFilteredData = new dataa({ date, filteredItems ,namee});
      await newFilteredData.save();

      
      const itemIds = filteredItems.map(item => item._id);
      await User.deleteMany({ _id: { $in: itemIds } });
      res.status(201).json({ message: 'Filtered data stored successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error storing filtered data' });
    }
}


export const getIssue = async(req,res)=>{
  
  try{
    const data = await User.find({});
    res.status(201).json(data);
  }catch(error){
    console.log(error)
  }
  
}
export const AssignIssue = async(req,res) =>{
  const { date,name,Issue,Moniter,Mouse,keyboard,ups,assignedPerson,systemNo,roomNo,id} = req.body;
  console.log(date)
  try {
    const newFilteredData = new UserAssign({ name, roomNo , systemNo, Moniter , keyboard , Mouse , ups , Issue,date,AssignedTo:assignedPerson});
    await newFilteredData.save();

    
    await User.deleteMany({ _id: { $in: id } });
    res.status(201).json({ message: 'Filtered data stored successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error storing filtered data' });
  }
}

export const getAssignIssue = async(req,res) =>{
  const { name, roomNo, systemNo } = req.query;
  console.log(name)
  console.log(systemNo)
//   console.log(AssignTo.namee)
try {
  const getData = await UserAssign.find({name,roomNo,systemNo})
  res.json(getData)
} catch (error) {
  res.status(500).json({ message: 'Error storing filtered data' });
}
}

export const IssueAssigned = async(req,res)=>{
  console.log("hii")
  
  try{
    const data = await UserAssign.find({});
    res.status(201).json(data);
  }catch(error){
    console.log(error)
  }
  
}

export const IssueFixed = async(req,res) =>{
  const { date,name,Issue,Moniter,Mouse,keyboard,ups,assignedPerson,systemNo,roomNo,id,datee} = req.body;
  console.log(datee)
  try {
    const newFilteredData = new empStatus({ name, roomNo , systemNo, Moniter , keyboard , Mouse , ups , Issue,date,AssignedTo:assignedPerson,FixedDate:datee});
    await newFilteredData.save();

    
    await UserAssign.deleteMany({ _id: { $in: id } });
    res.status(201).json({ message: 'Filtered data stored successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error storing filtered data' });
  }
}


export const status = async(req,res) =>{
  const {namee,roomNo,systemNo} = req.query;
//   console.log(AssignTo.namee)
try {
  const getData = await empStatus.find({namee,roomNo,systemNo})
  res.json(getData)
} catch (error) {
  res.status(500).json({ message: 'Error storing filtered data' });
}
}

export const empID = async(req,res)=>{
    const {empID} = req.params;
    console.log(empID);

    try{
       const ress = await EMP.findOne({empId:empID});
       console.log(ress);
       res.json(ress); 
    }catch(error){
      console.log(error)
    }
}
