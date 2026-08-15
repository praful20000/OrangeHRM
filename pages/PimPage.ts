import { Page } from '@playwright/test';

export class PimPage {
  readonly page: Page;
  readonly addEmployeeButton;
  readonly firstNameInput;
  readonly middleNameInput;
  readonly lastNameInput;
  readonly employeeIdInput;
  readonly saveButton;
  readonly fileInput;

  constructor(page: Page) {
    this.page = page;
    this.addEmployeeButton = page.getByText('Add Employee').first();
    this.firstNameInput = page.locator('input[name="firstName"]');
    this.middleNameInput = page.locator('input[name="middleName"]');
    this.lastNameInput = page.locator('input[name="lastName"]');
    this.employeeIdInput = page.locator('input[name="employeeId"]');
    this.saveButton = page.getByRole('button', { name: 'Save' }).first();
    this.fileInput = page.locator('input[type="file"]');
  }

  async openAddEmployee() {
    // navigate directly to add employee page to avoid UI menu flakiness
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/pim/addEmployee');
    await this.page.waitForLoadState('load');
  }

  async openEmployeeList() {
    // navigate directly to employee list page for reliable access
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList');
    await this.page.waitForLoadState('load');
  }

  // photo can be a file path or Playwright FilePayload / array
  async addEmployee(first: string, middle: string, last: string, id: string, photo?: any) {
    const form = this.page.locator('form').first();
    const inputs = form.locator('input:not([type="file"])');
    await inputs.nth(0).waitFor({ state: 'visible' });
    await inputs.nth(0).fill(first);
    await inputs.nth(1).fill(middle);
    await inputs.nth(2).fill(last);
    await inputs.nth(3).fill(id);
    // if photo provided, set input files before saving
    if (photo) {
      const fileInput = form.locator('input[type="file"]').first();
      await fileInput.setInputFiles(photo);
    }
    const save = form.getByRole('button', { name: 'Save' }).first();
    await save.waitFor({ state: 'visible' });
    await save.click();
  }
}
