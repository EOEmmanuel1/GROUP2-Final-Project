import mongoose from 'mongoose';

const DoctorSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: Number },
  role: { type: String, enum: ["doctor"], required: true },

  specialization: { type: String },
  qualifications: [{ type: String }],
  experiences: [{ type: String }],
  bio: { type: String, maxLength: 50 },

  timeSlots: [{ type: String }], // Assuming timeSlots are stored as strings, adjust if needed
  rating: {
    type: Number,
    default: 0,
  },
  isApproved: {
    type: String,
    enum: ["pending", "approved", "cancelled"],
    default: "pending",
  },
  appointments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Appointment" }]
},{ timestamps: true }); // Adds createdAt and updatedAt fields

const Doctor = mongoose.model('Doctor', DoctorSchema);
export default Doctor;
