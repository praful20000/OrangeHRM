# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: pim.spec.ts >> PIM - Add Employee >> Search Employee by Employee ID
- Location: tests\pim.spec.ts:312:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
Call log:
  - navigating to "https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList", waiting until "load"

```

# Test source

```ts
  1  | import { Page } from '@playwright/test';
  2  | 
  3  | export class PimPage {
  4  |   readonly page: Page;
  5  |   readonly addEmployeeButton;
  6  |   readonly firstNameInput;
  7  |   readonly middleNameInput;
  8  |   readonly lastNameInput;
  9  |   readonly employeeIdInput;
  10 |   readonly saveButton;
  11 |   readonly fileInput;
  12 | 
  13 |   constructor(page: Page) {
  14 |     this.page = page;
  15 |     this.addEmployeeButton = page.getByText('Add Employee').first();
  16 |     this.firstNameInput = page.locator('input[name="firstName"]');
  17 |     this.middleNameInput = page.locator('input[name="middleName"]');
  18 |     this.lastNameInput = page.locator('input[name="lastName"]');
  19 |     this.employeeIdInput = page.locator('input[name="employeeId"]');
  20 |     this.saveButton = page.getByRole('button', { name: 'Save' }).first();
  21 |     this.fileInput = page.locator('input[type="file"]');
  22 |   }
  23 | 
  24 |   async openAddEmployee() {
  25 |     // navigate directly to add employee page to avoid UI menu flakiness
  26 |     await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/pim/addEmployee');
  27 |     await this.page.waitForLoadState('load');
  28 |   }
  29 | 
  30 |   async openEmployeeList() {
  31 |     // navigate directly to employee list page for reliable access
> 32 |     await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/pim/viewEmployeeList');
     |                     ^ Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
  33 |     await this.page.waitForLoadState('load');
  34 |   }
  35 | 
  36 |   // photo can be a file path or Playwright FilePayload / array
  37 |   async addEmployee(first: string, middle: string, last: string, id: string, photo?: any) {
  38 |     const form = this.page.locator('form').first();
  39 |     const inputs = form.locator('input:not([type="file"])');
  40 |     await inputs.nth(0).waitFor({ state: 'visible' });
  41 |     await inputs.nth(0).fill(first);
  42 |     await inputs.nth(1).fill(middle);
  43 |     await inputs.nth(2).fill(last);
  44 |     await inputs.nth(3).fill(id);
  45 |     // if photo provided, set input files before saving
  46 |     if (photo) {
  47 |       const fileInput = form.locator('input[type="file"]').first();
  48 |       await fileInput.setInputFiles(photo);
  49 |     }
  50 |     const save = form.getByRole('button', { name: 'Save' }).first();
  51 |     await save.waitFor({ state: 'visible' });
  52 |     await save.click();
  53 |   }
  54 | }
  55 | 
```