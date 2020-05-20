import dotenv from 'dotenv';
import puppeteer from 'puppeteer';
import { Service } from 'typedi';
import { DateRangePicker } from './utils/dateRangePicker';

dotenv.config();

const username = process.env.AFFLUENT_USERNAME!;
const password = process.env.AFFLUENT_PASSWORD!;
const datesUrl = process.env.DATES_URL!;
const loginUrl = process.env.LOGIN_URL!;

@Service()
export class DatesTableFetcher {
    constructor(private dateRangePicker: DateRangePicker) {}

    async fetchTable() {
        try {
            const browser = await puppeteer.launch({
                headless: false,
                args    : ['--no-sandbox', '--disable-setuid-sandbox'],
              });
            const page = await browser.newPage();

            await this.login(page);
            await this.gotToDatesPage(page);

            await this.dateRangePicker.selectDateRange(page);
            
            await page.evaluate(() => {
                document.querySelector('#DataTables_Table_0_length > label > div > button > div')!.scrollIntoView();
            });
            
            const tableDataFilterButton = await page.$('#DataTables_Table_0_length > label > div > button > div');
            tableDataFilterButton!.click();

            await page.waitForSelector('#DataTables_Table_0_length > label > div > div > div > ul > li:nth-child(7) > a');
            await page.click('#DataTables_Table_0_length > label > div > div > div > ul > li:nth-child(7) > a');

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

    async gotToDatesPage(page: puppeteer.Page) {
        await page.goto(datesUrl);
        await page.waitFor(2000);
    }
}