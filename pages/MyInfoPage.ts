import { Page } from '@playwright/test';

export class MyInfoPage {
  readonly page: Page;
  readonly personalDetailsHeading;
  readonly firstNameInput;
  readonly middleNameInput;
  readonly lastNameInput;
  readonly employeeIdInput;
  readonly otherIdInput;
  readonly driversLicenseInput;
  readonly licenseExpiryInput;
  readonly dateOfBirthInput;
  readonly nationalitySelect;
  readonly maritalStatusSelect;
  readonly maleRadio;
  readonly femaleRadio;
  readonly saveButton;
  readonly editButton;

  constructor(page: Page) {
    this.page = page;
    this.personalDetailsHeading = page.getByRole('heading', { name: 'Personal Details' });
    this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
    this.middleNameInput = page.getByRole('textbox', { name: 'Middle Name' });
    this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
    this.employeeIdInput = this.field('Employee Id');
    this.otherIdInput = this.field('Other Id');
    this.driversLicenseInput = this.field("Driver's License Number");
    this.licenseExpiryInput = this.field('License Expiry Date');
    this.dateOfBirthInput = this.field('Date of Birth');
    this.nationalitySelect = page.getByText('Nationality', { exact: true }).locator('..').locator('..').locator('.oxd-select-text');
    this.maritalStatusSelect = page.getByText('Marital Status', { exact: true }).locator('..').locator('..').locator('.oxd-select-text');
    this.maleRadio = page.getByRole('radio', { name: 'Male' });
    this.femaleRadio = page.getByRole('radio', { name: 'Female' });
    this.saveButton = page.getByRole('button', { name: 'Save' }).first();
    this.editButton = page.getByRole('button', { name: 'Edit' });
  }

  async openPersonalDetails() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewMyDetails');
    await this.page.waitForURL(/\/pim\/viewPersonalDetails\//);
  }

  async enterEditMode() {
    if (await this.editButton.count() > 0) {
      await this.editButton.click();
    }
  }

  async selectDropdown(select: typeof this.nationalitySelect, option: string) {
    await select.click();
    await this.page.getByRole('option', { name: option, exact: true }).click();
  }

  async savePersonalDetails() {
    await this.saveButton.click();
  }

  private field(label: string) {
    return this.page.getByText(label, { exact: true }).locator('..').locator('..').getByRole('textbox');
  }

  async refresh() {
    await this.page.reload();
    await this.personalDetailsHeading.waitFor({ state: 'visible' });
  }

  restrictedField(label: string) {
    return this.field(label);
  }
}