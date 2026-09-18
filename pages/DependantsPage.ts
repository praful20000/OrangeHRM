import { Page } from '@playwright/test';

export class DependantsPage {
  readonly page: Page;
  readonly heading;
  readonly addButton;
  readonly nameInput;
  readonly relationshipSelect;
  readonly dateOfBirthInput;
  readonly saveButton;
  readonly form;

  constructor(page: Page) {
    this.page = page;
    this.heading = page.getByRole('heading', { name: 'Assigned Dependents' });
    this.addButton = page.getByRole('button', { name: /Add$/ }).first();
    this.form = page.getByRole('heading', { name: 'Add Dependent' }).locator('..');
    this.nameInput = this.formField('Name');
    this.relationshipSelect = this.form.locator('.oxd-input-group').filter({ hasText: 'Relationship' }).locator('.oxd-select-text');
    this.dateOfBirthInput = this.form.locator('.oxd-input-group').filter({ hasText: 'Date of Birth' }).getByRole('textbox');
    this.saveButton = this.form.getByRole('button', { name: 'Save' });
  }

  private formField(label: string) {
    return this.form.locator('.oxd-input-group').filter({ hasText: label }).getByRole('textbox');
  }

  async open() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewDependents/empNumber/7');
    await this.page.waitForURL(/\/pim\/viewDependents\//);
  }

  async addDependant(name: string, relationship: string, dateOfBirth: string) {
    await this.addButton.click();
    await this.nameInput.fill(name);
    await this.relationshipSelect.click();
    await this.page.getByRole('option', { name: relationship, exact: true }).click();
    await this.dateOfBirthInput.fill(dateOfBirth);
    await this.saveButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  row(name: string) {
    return this.page.locator('.oxd-table-body .oxd-table-row').filter({ hasText: name });
  }

  async deleteDependant(name: string) {
    const row = this.row(name);
    await row.getByRole('checkbox').check({ force: true });
    const deleteButton = this.page.getByRole('button', { name: /Delete/i }).first();
    await deleteButton.click();
    const confirmButton = this.page.getByRole('button', { name: /Yes, Delete|Confirm/i });
    if (await confirmButton.count() > 0) await confirmButton.click();
  }
}