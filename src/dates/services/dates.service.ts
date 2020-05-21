import { Service } from 'typedi';
import { DatesTableFetcher } from '../integrations/datesTableFetcher';
import { DateModel, DateRepository}  from '../../repositories/date.repository'

@Service()
export class DatesService {
    constructor(
        private datesTableFetcher: DatesTableFetcher,
    ) {}

    async getDatesTableData() {
        const dataAlreadyExists = !!await DateRepository.findOne({ where: { id: '1' } });

        if(!dataAlreadyExists) {
            const data = await this.datesTableFetcher.fetchTable();
            await this.saveDatesTableData(data);
            return data;
        } else {
            return await this.getDatesTableDataFormDb();
        }
    }

    async saveDatesTableData(datesTableData: DateModel[]) {
        return await DateRepository.bulkCreate(datesTableData, {
            updateOnDuplicate: ['date']
        });
    }

    private async getDatesTableDataFormDb() {
        return await DateRepository.findAll();
    }
}