import mongoose from 'mongoose';

const TimeSlotSchema = new mongoose.Schema({
  startTime: { type: String, required: true }, // e.g., "09:00:00.000"
  endTime: { type: String, required: true } // e.g., "10:00:00.000"
});

const DoctorSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  role: { type: String, enum: ["doctor"], required: true },
  specialization: { type: String },
  qualifications: [{ type: String }],
  experiences: [{ type: String }],
  bio: { type: String, maxLength: 50 },
  about: { type: String },
  timeSlots: [TimeSlotSchema], // Using the TimeSlotSchema here
  rating: {
    type: Number,
    default: 0,
  },
  isApproved: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  }
}, { timestamps: true });

const Doctor = mongoose.model('Doctor', DoctorSchema);
export default Doctor;
