import { Request, Response, Router } from 'express';
import { Container } from 'typedi';

import { DatesController } from './controllers/dates.controller';

const router = Router();
const datesController = Container.get(DatesController);

router
  .route('/')
  .get((req: Request, res: Response) => datesController.getDates(req, res));

export default router;
