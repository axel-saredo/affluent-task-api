import dotenv from 'dotenv';
import puppeteer from 'puppeteer';
import { Service } from 'typedi';

dotenv.config();

@Service()
export class DateRangePicker {
    private startDate = '04/01/2020';
    private endDate = '04/30/2020';

    private startDateSelector = 'input[name=daterangepicker_start]';
    private endDateSelector = 'input[name=daterangepicker_end]';

    async selectDateRange(page: puppeteer.Page) {
        await this.openRangeDatePicker(page);

        await page.waitForSelector(this.startDateSelector);
        await page.waitForSelector(this.endDateSelector);

        await this.removeAndAddDates(page);
        await this.applyChanges(page);
    }

    private async openRangeDatePicker(page: puppeteer.Page) {
        const datePicker = await page.$('#dashboard-report-range');
        datePicker!.click();
    }

    private async removeAndAddDates(page: puppeteer.Page) {
        this.deletePreviousDate(page, this.startDateSelector);
        await this.inputDate(page, this.startDateSelector, this.startDate);

        this.deletePreviousDate(page, this.endDateSelector);
        await this.inputDate(page, this.endDateSelector, this.endDate);
    }

    private async deletePreviousDate(page: puppeteer.Page, selector: string) {
        await page.click(selector);
        await page.mouse.down({clickCount: 3});
        await page.keyboard.press('Backspace');
    }

    private async inputDate(page: puppeteer.Page, selector: string, date: string) {
        await page.click(selector);
        await page.type(selector, date);
        await page.keyboard.press('Enter');
    }

    private async applyChanges(page: puppeteer.Page) {
        const applyButton =  await page.$('.applyBtn');
        await applyButton!.click();
        
        await page.waitFor(2000);
    }
}