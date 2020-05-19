import { Router } from 'express';
import { fetchUsers } from '../controllers/users';

const router = Router();

router.get('/', fetchUsers);

export default router;
