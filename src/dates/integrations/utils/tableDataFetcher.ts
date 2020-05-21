import puppeteer from 'puppeteer';
import { Service } from 'typedi';

@Service()
export class TableDataFetcher {

    private tableRowsSelector = '#DataTables_Table_0 > tbody > tr';
    private lastTableRowSelector = '#DataTables_Table_0 > tbody > tr:nth-child(30)';

    private filterButtonSelector = '#DataTables_Table_0_length > label > div > button > div';
    private allDataButtonSelector = '#DataTables_Table_0_length > label > div > div > div > ul > li:nth-child(7) > a';

    async fetchTableData(page: puppeteer.Page) {
        await this.showCompleteTableData(page);

        const tableData = await page.$$eval(this.tableRowsSelector, trs => trs.map(tr => {
            const tds = [...tr.getElementsByTagName('td')];
            return tds.map(td => td.textContent);
        }));

        const data: any = tableData.map((columnsData) => { 
            return { 
                date: columnsData[0]!,
                commissionsTotal: columnsData[1]!,
                salesNet: columnsData[2]!,
                leadsNet: columnsData[3]!,
                clicks: columnsData[4]!,
                epc: columnsData[5]!,
                impressions: columnsData[6]!,
                cr: columnsData[7]!,
             };
        });

        return data;
    }

    private async showCompleteTableData(page: puppeteer.Page) {
        await this.scrollUntilFilterButton(page);

        await this.showAllData(page);
        await page.waitForSelector(this.lastTableRowSelector);
    }

    private async showAllData(page: puppeteer.Page) {
        const tableDataFilterButton = await page.$(this.filterButtonSelector);
        await tableDataFilterButton!.click();

        await page.waitForSelector(this.allDataButtonSelector);
        await page.click(this.allDataButtonSelector);
    }

    private async scrollUntilFilterButton(page: puppeteer.Page) {
        await page.evaluate(() => {
            document.querySelector('#DataTables_Table_0_length > label > div > button > div')!.scrollIntoView();
        });
    }
}