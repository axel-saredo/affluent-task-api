import { Service } from 'typedi';

import { DatesTableFetcher } from '../integrations/datesTableFetcher';
import { DateModel, DateRepository}  from '../../repositories/date.repository'

@Service()
export class DatesService {
    data: any;

    constructor(private datesTableFetcher: DatesTableFetcher) {}

    async getDatesTableData() {
        const dataAlreadyExists = !!await DateRepository.findOne({ where: { id: '1' } });

        if(!dataAlreadyExists) {
            if(!this.datesTableFetcher.alreadyFetched) {
                this.data = await this.datesTableFetcher.fetchTable();
            }
            await this.saveDatesTableData(this.data);
            return this.data;
        } else {
            return await this.getDatesTableDataFormDb();
        }
    }

    private async saveDatesTableData(datesTableData: DateModel[]) {
        if(!!this.data) {
            return await DateRepository.bulkCreate(datesTableData, {
                updateOnDuplicate: ['date']
            });
        }
    }

    private async getDatesTableDataFormDb() {
        return await DateRepository.findAll();
    }
}