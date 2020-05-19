import Container from 'typedi';
import { Router } from 'express';

import { UsersController } from './controllers/user.controller';

const router = Router();

const usersController: UsersController = Container.get(UsersController);

router
    .route('/users')
    .get((req, res) => usersController.fetchUsers(req, res));

export default router;
