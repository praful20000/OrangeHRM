import { Page } from '@playwright/test';

export class ContactDetailsPage {
  readonly page: Page;
  readonly heading;
  readonly street1Input;
  readonly street2Input;
  readonly cityInput;
  readonly stateInput;
  readonly zipInput;
  readonly countrySelect;
  readonly homeTelephoneInput;
  readonly mobileInput;
  readonly workTelephoneInput;
  readonly workEmailInput;
  readonly otherEmailInput;
  readonly saveButton;
  readonly editButton;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Contact Details' });
    this.street1Input = this.field('Street 1');
    this.street2Input = this.field('Street 2');
    this.cityInput = this.field('City');
    this.stateInput = this.field('State/Province');
    this.zipInput = this.field('Zip/Postal Code');
    this.countrySelect = this.select('Country');
    this.homeTelephoneInput = this.field('Home');
    this.mobileInput = this.field('Mobile');
    this.workTelephoneInput = this.field('Work');
    this.workEmailInput = this.field('Work Email');
    this.otherEmailInput = this.field('Other Email');
    this.saveButton = page.getByRole('button', { name: 'Save' }).first();
    this.editButton = page.getByRole('button', { name: 'Edit' });
  }

  private field(label: string) {
    return this.page.getByText(label, { exact: true }).locator('..').locator('..').getByRole('textbox');
  }

  private select(label: string) {
    return this.page.getByText(label, { exact: true }).locator('..').locator('..').locator('.oxd-select-text');
  }

  async open() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/pim/contactDetails/empNumber/7');
    await this.page.waitForURL(/\/pim\/contactDetails\//);
  }

  async enterEditMode() {
    if (await this.editButton.count() > 0) await this.editButton.click();
  }

  async selectCountry(country: string) {
    await this.countrySelect.click();
    await this.page.getByRole('option', { name: country, exact: true }).click();
  }

  async save() {
    await this.saveButton.click();
  }

  async refresh() {
    await this.page.reload();
    await this.heading.waitFor({ state: 'visible' });
  }
}