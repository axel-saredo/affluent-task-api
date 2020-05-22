import { Router } from 'express';

import userRoutes from './users/router';
import datesRoutes from './dates/router';

const router = Router();

router.use('/users', userRoutes);
router.use('/dates', datesRoutes);

export default router;
