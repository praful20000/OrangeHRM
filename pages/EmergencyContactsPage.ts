import { Page } from '@playwright/test';

export class EmergencyContactsPage {
  readonly page: Page;
  readonly heading;
  readonly addButton;
  readonly nameInput;
  readonly relationshipInput;
  readonly homeTelephoneInput;
  readonly mobileInput;
  readonly workTelephoneInput;
  readonly saveButton;
  readonly form;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Assigned Emergency Contacts' });
    this.addButton = page.getByRole('button', { name: /Add$/ }).first();
    this.form = page.getByRole('heading', { name: 'Save Emergency Contact' }).locator('..');
    this.nameInput = this.formField('Name');
    this.relationshipInput = this.formField('Relationship');
    this.homeTelephoneInput = this.formField('Home Telephone');
    this.mobileInput = this.formField('Mobile');
    this.workTelephoneInput = this.formField('Work Telephone');
    this.saveButton = this.form.getByRole('button', { name: 'Save' });
  }

  private formField(label: string) {
    return this.form.locator('.oxd-input-group').filter({ hasText: label }).getByRole('textbox');
  }

  async open() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmergencyContacts/empNumber/7');
    await this.page.waitForURL(/\/pim\/viewEmergencyContacts\//);
  }

  async addContact(name: string, relationship: string, homeTelephone: string, mobile: string, workTelephone: string) {
    await this.addButton.click();
    await this.nameInput.fill(name);
    await this.relationshipInput.fill(relationship);
    await this.homeTelephoneInput.fill(homeTelephone);
    await this.mobileInput.fill(mobile);
    await this.workTelephoneInput.fill(workTelephone);
    await this.saveButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  row(name: string) {
    return this.page.locator('.oxd-table-body .oxd-table-row').filter({ hasText: name });
  }

  async deleteContact(name: string) {
    const row = this.row(name);
    await row.getByRole('checkbox').check({ force: true });
    const deleteButton = this.page.getByRole('button', { name: /Delete/i }).first();
    await deleteButton.click();
    const confirmButton = this.page.getByRole('button', { name: /Yes, Delete|Confirm/i });
    if (await confirmButton.count() > 0) await confirmButton.click();
  }
}