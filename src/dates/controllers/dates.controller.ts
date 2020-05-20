import { Request, Response } from 'express';
import { Service } from 'typedi';
import { DatesService } from '../services/dates.service';

@Service()
export class DatesController {
    constructor(private datesService: DatesService) {}

    async getDates(req: Request, res: Response) {
        try {
            await this.datesService.getDatesTableData();
            res.send('Dates route!');
        } catch (error) {
            console.error(error);
        }
    }
}
