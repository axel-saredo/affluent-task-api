import { Service } from 'typedi';
import { DatesTableFetcher } from '../integrations/datesTableFetcher';

@Service()
export class DatesService {
    constructor(private datesTableFetcher: DatesTableFetcher) {}

    async getDatesTableData() {
        this.datesTableFetcher.fetchTable();
    }
}