import express from 'express';
import {
  updateUser,
  deleteUser,
  getSingleUser,
  getAllUser
} from '../controllers/userController.js';
import { authenticate, restrict } from '../controllers/auth/verifyToken.js';


const router = express.Router();

router.put('/:id', authenticate, restrict(["patient"]), updateUser);
router.get('/:id', authenticate, restrict(["patient"]), getSingleUser);
router.get('/', authenticate, restrict(["admin"]), getAllUser);
router.delete('/:id', authenticate, restrict(["patient"]), deleteUser);

export default router;
