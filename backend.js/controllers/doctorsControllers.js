import Doctor from '../models/Doctor.js';

export const updateDoctor = async(req,res)=>{
  const id = req.param.id
  try {
    const updatedDoctor = await Doctor.findByAndUpdate(
      id, 
      {$set:req.body}, 
      {new:true})
    res.status(200).json({success:true, message: "Successfully updated", data:updateDoctor,})
  } catch (error) {
    res.status(500).json({success:false, message: "Failed to updated"})
  }
}

export const deleteDoctor = async(req,res)=>{
  const id = req.param.id
  try {
     await Doctor.findByAndDelete(
      id, 
      {$set:req.body}, 
      {new:true})
    res.status(200).json({success:true, message: "Successfully deleted", data:deleted})
  } catch (error) {
    res.status(500).json({success:false, message: "Failed to deleted"})
    
  }
}

export const getSingleDoctor = async(req,res)=>{
  const id = req.param.id
  try {
    const doctor = await Doctor.findById(id).select("-password ")
    res.status(200).json({success:true, message: "Doctor found", data:Doctor})
  } catch (error) {
    res.status(404).json({success:false, message: "Doctor not found", data:updateDoctor})
    
  }
}

export const getAllDoctor = async(req,res)=>{
  try {
    const {query} = req.query
    let doctor;
    if (query){
       doctor = await Doctor.find({isApproved: 'approved', $or:[
        {name:{$regex:query,$options:"i"}},
        {specialization:{$regex:query,$options:"i"}}
      ],
    }).select("-password")
    } else {
    doctor = await Doctor.find ({isApproved: "approved"}).select("-password")
      id }
    res.status(200).json({success:true, message: "Doctor found", Doctor})
  } catch (error) {
    res.status(404).json({success:false, message: "Not found", data:updateDoctor})
    
  }
}

// Add more doctor-related actions as needed