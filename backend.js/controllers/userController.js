import User from '../models/User.js';

export const updateUser = async (req,res) => {
  const id = req.params.id
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id, 
      {$set:req.body}, 
      {new:true})
    res.status(200).json({success:true, message: "Successfully updated", data: updatedUser})
  } catch (error) {
    res.status(500).json({success:false, message: "Failed to updated"})
  }
}

export const deleteUser = async (req,res)=>{
  const id = req.params.id
  try {
    const updatedUser = await User.findByIdAndDelete(
      id, 
      {$set:req.body}, 
      {new:true})
    res.status(200).json({success:true, message: "Successfully deleted", data: updatedUser})
  } catch (error) {
    res.status(500).json({success:false, message: "Failed to deleted"})
    
  }
}

export const getSingleUser = async (req,res)=>{
  const id = req.params.id
  try {
    const user = await User.findById(id).select("-password ")
    res.status(200).json({success:true, message: "User found", data: user})
  } catch (error) {
    res.status(404).json({success:false, message: "User not found"})
    
  }
}

export const getAllUser = async (req,res)=>{
  try {
    const user = await User.find()
    res.status(200).json({success:true, message: "User found", user})
  } catch (error) {
    res.status(404).json({success:false, message: "User not found"})
    
  }
}

