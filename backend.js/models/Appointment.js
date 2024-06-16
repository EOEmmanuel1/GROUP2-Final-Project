import mongoose from 'mongoose';

const TimeSlotSchema = new mongoose.Schema({
  startTime: { type: String, required: true }, // e.g., "09:00:00.000"
  endTime: { type: String, required: true } // e.g., "10:00:00.000"
});

const AppointmentSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  date: { type: Date, required: true },
  timeSlot: { type: TimeSlotSchema, required: true },
  status: { type: String, enum: ['pending', 'approved', 'cancelled'], default: 'pending' },
  username: { type: String, required: true },
  description: { type: String, required: true }
}, { timestamps: true });

const Appointment = mongoose.model('Appointment', AppointmentSchema);
export default Appointment;
