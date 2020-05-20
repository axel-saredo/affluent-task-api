import { Service } from 'typedi';
import { DatesTableFetcher } from '../integrations/datesTableFetcher';
import { DateModel, DateRepository}  from '../../repositories/date.repository'

@Service()
export class DatesService {
    constructor(
        private datesTableFetcher: DatesTableFetcher,
    ) {}

    async getDatesTableData() {
        return await this.datesTableFetcher.fetchTable();
    }

    async saveDatesTableData(datesTableData: DateModel[]) {
        return DateRepository.bulkCreate(datesTableData, {
            updateOnDuplicate: ['date']
        })
    }
}