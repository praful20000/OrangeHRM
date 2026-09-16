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
    this.employeeIdInput = page.locator('input:not([type="file"]):not([type="checkbox"])').last();
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
    await this.firstNameInput.waitFor({ state: 'visible', timeout: 15000 });
    await this.firstNameInput.fill(first);
    await this.middleNameInput.fill(middle);
    await this.lastNameInput.fill(last);
    await this.employeeIdInput.fill(id);

    if (photo) {
      await this.fileInput.setInputFiles(photo);
    }

    await this.saveButton.waitFor({ state: 'visible', timeout: 15000 });
    await this.saveButton.click();
  }
}
