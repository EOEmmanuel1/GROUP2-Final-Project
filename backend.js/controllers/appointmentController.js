import Appointment from '../models/Appointment.js';
import User from '../models/User.js';
import Doctor from '../models/Doctor.js';

export const bookAppointment = async (req, res) => {
  const { doctorId, date, timeSlot, description } = req.body;
  const patientId = req.userId; // Use the user ID from the authentication middleware

  try {
    // Check if patient exists
    const patient = await User.findById(patientId);
    if (!patient) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }

    // Check if doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }

    // Check if the time slot is within doctor's available time slots
    if (!isWithinTimeSlot(doctor.timeSlots, timeSlot)) {
      return res.status(400).json({ success: false, message: 'Invalid time slot' });
    }

    // Check if the time slot is already booked for the doctor
    const existingAppointment = await Appointment.findOne({
      doctor: doctorId,
      date,
      'timeSlot.startTime': timeSlot.startTime,
      'timeSlot.endTime': timeSlot.endTime
    });
    if (existingAppointment) {
      return res.status(400).json({ success: false, message: 'Time slot already booked' });
    }

    // Create and save the new appointment
    const newAppointment = new Appointment({
      patient: patientId,
      username: patient.username, // Use the patient's username
      doctor: doctorId,
      date,
      timeSlot,
      description
    });

    await newAppointment.save();
    res.status(201).json({ success: true, message: 'Appointment booked successfully', appointment: newAppointment });
  } catch (error) {
    console.error("Error booking appointment:", error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

// Helper function
const isWithinTimeSlot = (doctorTimeSlots, requestedTimeSlot) => {
  const requestedStart = new Date(`1970-01-01T${requestedTimeSlot.startTime}Z`).getTime();
  const requestedEnd = new Date(`1970-01-01T${requestedTimeSlot.endTime}Z`).getTime();

  return doctorTimeSlots.some(slot => {
    const slotStart = new Date(`1970-01-01T${slot.startTime}Z`).getTime();
    const slotEnd = new Date(`1970-01-01T${slot.endTime}Z`).getTime();
    return requestedStart >= slotStart && requestedEnd <= slotEnd;
  });
};

export const getAppointments = async (req, res) => {
  const userId = req.userId;
  const role = req.role;

  try {
    let appointments;
    if (role === 'patient') {
      appointments = await Appointment.find({ patient: userId }).populate('doctor').populate('patient');
    } else if (role === 'doctor') {
      appointments = await Appointment.find({ doctor: userId }).populate('doctor').populate('patient');
    }

    res.status(200).json({ success: true, appointments });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const updateAppointmentStatus = async (req, res) => {
  const { appointmentId, status } = req.body;
  const userId = req.userId;
  const role = req.role;

  // Ensure the status is either 'approved' or 'cancelled'
  const validStatuses = ['approved', 'cancelled'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ success: false, message: 'Invalid status. Only "approved" or "cancelled" are allowed.' });
  }

  try {
    // Find the appointment by ID
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    // Ensure the user is the doctor associated with the appointment
    if (role === 'doctor' && appointment.doctor.toString() !== userId) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this appointment' });
    }

    // Update the status of the appointment
    appointment.status = status;
    await appointment.save();

    res.status(200).json({ success: true, message: 'Appointment status updated successfully' });
  } catch (error) {
    console.error('Error updating appointment status:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};