import express from 'express';
import { updateDoctor,
     deleteDoctor,
     getAllDoctor,
     getSingleDoctor } from '../controllers/doctorsControllers.js';
import { authenticate, restrict } from '../controllers/auth/verifyToken.js'

const router = express.Router();

// Example route
router.get('/allDoctors',  authenticate, restrict(["admin"]), getAllDoctor);
router.put('/:id', authenticate, restrict(["doctor"]), updateDoctor);
router.get('/:id', getSingleDoctor);
router.delete('/:id', authenticate, restrict(["doctor"]), deleteDoctor);

export default router;