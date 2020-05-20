import dotenv from 'dotenv';
import puppeteer from 'puppeteer';
import { Service } from 'typedi';
import { DateRangePicker } from './utils/dateRangePicker';
import { TableDataFetcher } from './utils/tableDataFetcher';

dotenv.config();

const username = process.env.AFFLUENT_USERNAME!;
const password = process.env.AFFLUENT_PASSWORD!;
const datesUrl = process.env.DATES_URL!;
const loginUrl = process.env.LOGIN_URL!;

@Service()
export class DatesTableFetcher {
    constructor(
        private dateRangePicker: DateRangePicker,
        private tableDataFetcher: TableDataFetcher,
    ) {}

    async fetchTable() {
        try {
            const browser = await puppeteer.launch({
                headless: true,
                args    : ['--no-sandbox', '--disable-setuid-sandbox'],
              });

            const page = await browser.newPage();

            await this.login(page);
            await this.goToDatesPage(page);

            await this.dateRangePicker.selectDateRange(page);

            return await this.tableDataFetcher.fetchTableData(page);
        } catch (error) {
            console.error('DatesTableFetcher error: ', error);
            throw error;
        }
    }

    private async login(page: puppeteer.Page) {
        await page.goto(loginUrl);
        await page.waitForSelector('input[name=username]');
        await page.type('input[name=username]', username);
        await page.type('input[name=password]', password);
        await page.click('button[type=submit]');
        await page.waitForNavigation()
    }

    async goToDatesPage(page: puppeteer.Page) {
        await page.goto(datesUrl);
        await page.waitFor(2000);
    }
}