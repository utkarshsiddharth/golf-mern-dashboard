import express from 'express';

import { protect } from '../middleware/auth.js';

// controllers //
import {
  getUsers,
  getUser,
  addUser,
  getMe,
  login,
  updateUserDetails,
  removeUser,
} from '../controllers/authController.js';

const router = express.Router();

// routes //
router.route('/').get(getUsers);
router.route('/me').get(protect, getMe);
router
  .route('/:id')
  .get(getUser)
  .put(protect, updateUserDetails)
  .delete(protect, removeUser);
router.route('/login').post(login);
router.route('/register').post(addUser);

export default router;
