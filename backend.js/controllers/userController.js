import User from '../models/User.js';

export const updateUser = async (req,res) => {
  const id = req.param.id
  try {
    const updatedUser = await User.findByAndUpdate(
      id, 
      {$set:req.body}, 
      {new:true})
    res.status(200).json({success:true, message: "Successfully updated", data:updateUser})
  } catch (error) {
    res.status(500).json({success:false, message: "Failed to updated"})
  }
}

export const deleteUser = async (req,res)=>{
  const id = req.param.id
  try {
    const updatedUser = await User.findByAndDelete(
      id, 
      {$set:req.body}, 
      {new:true})
    res.status(200).json({success:true, message: "Successfully deleted", data:deleted})
  } catch (error) {
    res.status(500).json({success:false, message: "Failed to deleted"})
    
  }
}

export const getSingleUser = async (req,res)=>{
  const id = req.param.id
  try {
    const user = await User.findById(id).select("-password ")
    res.status(200).json({success:true, message: "User found", data:User})
  } catch (error) {
    res.status(404).json({success:false, message: "User not found", data:updateUser})
    
  }
}

export const getAllUser = async (req,res)=>{
  try {
    const user = await User.find (
      id )
    res.status(200).json({success:true, message: "User found", User})
  } catch (error) {
    res.status(404).json({success:false, message: "User not found", data:updateUser})
    
  }
}

