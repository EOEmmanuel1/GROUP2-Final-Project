import express from 'express';
import { bookAppointment, getAppointments, updateAppointmentStatus } from '../controllers/appointmentController.js';
import { authenticate, restrict } from '../controllers/auth/verifyToken.js';

const router = express.Router();

router.post('/book', authenticate, restrict(['patient', 'doctor']), bookAppointment);
router.get('/allAppointment', authenticate, getAppointments);
router.put('/status', authenticate, restrict(['doctor']), updateAppointmentStatus);

export default router;