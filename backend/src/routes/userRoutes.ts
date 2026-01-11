import express from 'express';
import { 
    createUser, 
    loginUser, 
    logoutUser, 
    getAllUsers, 
    getCurrentUserProfile, 
    updateCurrentUserProfile, 
    getUserById, 
    updateUserById, 
    deleteUserById,
    requestPasswordReset,
    resetPassword
} from '../controllers/userController';
import { authenticate, authorize } from '../middleware/authMiddleware';

const router = express.Router();

router.route('/')
.post(createUser)
.get(authenticate, authorize, getAllUsers);
router.post('/auth', loginUser);
router.post('/logout', logoutUser);

router.route('/profile')
.get(authenticate, getCurrentUserProfile)
.put(authenticate, updateCurrentUserProfile);

router.post('/forgot-password', requestPasswordReset);
router.post('/reset-password', resetPassword);

// admin routes
router.route('/:id')
.get(authenticate, authorize, getUserById)
.put(authenticate, authorize, updateUserById)
.delete(authenticate, authorize, deleteUserById);
export default router;