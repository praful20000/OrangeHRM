# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: my-info.spec.ts >> My Info - Dependants >> ESS user can add a dependant
- Location: tests\my-info.spec.ts:236:7

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/dashboard\/index/
Received string:  "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
Timeout: 5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    13 × locator resolved to <html>…</html>
       - unexpected value "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"

```

```yaml
- img "company-branding"
- heading "Login" [level=5]
- alert:
  - text: 
  - paragraph: Invalid credentials
- paragraph: "Username : Admin"
- paragraph: "Password : admin123"
- text:  Username
- textbox "Username"
- text:  Password
- textbox "Password"
- button "Login"
- paragraph: Forgot your password?
- link:
  - /url: https://www.linkedin.com/company/orangehrm/mycompany/
- link:
  - /url: https://www.facebook.com/OrangeHRM/
- link:
  - /url: https://twitter.com/orangehrm?lang=en
- link:
  - /url: https://www.youtube.com/c/OrangeHRMInc
- paragraph: OrangeHRM OS 5.9
- paragraph:
  - text: © 2005 - 2026
  - link "OrangeHRM, Inc":
    - /url: http://www.orangehrm.com
  - text: . All rights reserved.
- img "orangehrm-logo"
```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | import { LoginPage } from '../pages/LoginPage';
  3   | import { DashboardPage } from '../pages/DashboardPage';
  4   | import { MyInfoPage } from '../pages/MyInfoPage';
  5   | import { ContactDetailsPage } from '../pages/ContactDetailsPage';
  6   | import { EmergencyContactsPage } from '../pages/EmergencyContactsPage';
  7   | import { DependantsPage } from '../pages/DependantsPage';
  8   | import testData from '../test-data/test-data.json';
  9   | 
  10  | async function loginAsEss(page: import('@playwright/test').Page) {
  11  |   const login = new LoginPage(page);
  12  |   await login.goto();
  13  |   await login.login(testData.loginDetails.username, testData.loginDetails.password);
> 14  |   await expect(page).toHaveURL(/\/dashboard\/index/);
      |                      ^ Error: expect(page).toHaveURL(expected) failed
  15  |   return new DashboardPage(page);
  16  | }
  17  | 
  18  | async function openMyInfoTab(page: import('@playwright/test').Page, dashboard: DashboardPage, tab: string) {
  19  |   await dashboard.clickNavItem('MyInfo');
  20  |   await page.getByRole('link', { name: tab, exact: true }).click();
  21  | }
  22  | 
  23  | test.describe('My Info - Personal Details', { tag: '@regression' }, () => {
  24  |   test('ESS user can view personal details and personal information fields', async ({ page }) => {
  25  |     const login = new LoginPage(page);
  26  |     const dashboard = new DashboardPage(page);
  27  |     const myInfo = new MyInfoPage(page);
  28  | 
  29  |     await login.goto();
  30  |     await login.login(testData.loginDetails.username, testData.loginDetails.password);
  31  | 
  32  |     await expect(page).toHaveURL(/\/dashboard\/index/);
  33  | 
  34  |     await dashboard.clickNavItem('MyInfo');
  35  |     await expect(page).toHaveURL(/\/pim\/viewPersonalDetails\//);
  36  | 
  37  |     await expect(myInfo.personalDetailsHeading).toBeVisible();
  38  |     await expect(myInfo.firstNameInput).toBeVisible();
  39  |     await expect(myInfo.middleNameInput).toBeVisible();
  40  |     await expect(myInfo.lastNameInput).toBeVisible();
  41  |     await expect(myInfo.employeeIdInput).toBeVisible();
  42  |     await expect(myInfo.otherIdInput).toBeVisible();
  43  |     await expect(myInfo.driversLicenseInput).toBeVisible();
  44  |   });
  45  | 
  46  |   test('ESS user can edit personal details and retain the updates after refresh', async ({ page }) => {
  47  |     const login = new LoginPage(page);
  48  |     const dashboard = new DashboardPage(page);
  49  |     const myInfo = new MyInfoPage(page);
  50  | 
  51  |     await login.goto();
  52  |     await login.login(testData.loginDetails.username, testData.loginDetails.password);
  53  |     await expect(page).toHaveURL(/\/dashboard\/index/);
  54  | 
  55  |     await dashboard.clickNavItem('MyInfo');
  56  |     await expect(page).toHaveURL(/\/pim\/viewPersonalDetails\//);
  57  |     await myInfo.enterEditMode();
  58  | 
  59  |     const updatedFirstName = `Ess${Date.now().toString().slice(-6)}`;
  60  |     const updatedMiddleName = 'Updated';
  61  |     const updatedLastName = 'User';
  62  |     const updatedLicenseExpiry = '2030-12-31';
  63  | 
  64  |     await myInfo.firstNameInput.fill(updatedFirstName);
  65  |     await myInfo.middleNameInput.fill(updatedMiddleName);
  66  |     await myInfo.lastNameInput.fill(updatedLastName);
  67  |     await myInfo.licenseExpiryInput.fill(updatedLicenseExpiry);
  68  |     await myInfo.femaleRadio.check();
  69  |     await myInfo.selectDropdown(myInfo.maritalStatusSelect, 'Married');
  70  |     await myInfo.selectDropdown(myInfo.nationalitySelect, 'Canadian');
  71  |     await myInfo.savePersonalDetails();
  72  | 
  73  |     await expect(page.getByText('Successfully Saved')).toBeVisible();
  74  |     await expect(myInfo.firstNameInput).toHaveValue(updatedFirstName);
  75  |     await expect(myInfo.middleNameInput).toHaveValue(updatedMiddleName);
  76  |     await expect(myInfo.lastNameInput).toHaveValue(updatedLastName);
  77  |     await expect(myInfo.licenseExpiryInput).toHaveValue(updatedLicenseExpiry);
  78  |     await expect(myInfo.femaleRadio).toBeChecked();
  79  | 
  80  |     await myInfo.refresh();
  81  | 
  82  |     await expect(myInfo.firstNameInput).toHaveValue(updatedFirstName);
  83  |     await expect(myInfo.middleNameInput).toHaveValue(updatedMiddleName);
  84  |     await expect(myInfo.lastNameInput).toHaveValue(updatedLastName);
  85  |     await expect(myInfo.licenseExpiryInput).toHaveValue(updatedLicenseExpiry);
  86  |     await expect(myInfo.femaleRadio).toBeChecked();
  87  |     await expect(myInfo.maritalStatusSelect).toContainText('Married');
  88  |     await expect(myInfo.nationalitySelect).toContainText('Canadian');
  89  |   });
  90  | 
  91  |   test('ESS user cannot edit restricted personal details', async ({ page }) => {
  92  |     const login = new LoginPage(page);
  93  |     const dashboard = new DashboardPage(page);
  94  |     const myInfo = new MyInfoPage(page);
  95  | 
  96  |     await login.goto();
  97  |     await login.login(testData.loginDetails.username, testData.loginDetails.password);
  98  |     await expect(page).toHaveURL(/\/dashboard\/index/);
  99  | 
  100 |     await dashboard.clickNavItem('MyInfo');
  101 |     await expect(page).toHaveURL(/\/pim\/viewPersonalDetails\//);
  102 |     await myInfo.enterEditMode();
  103 | 
  104 |     for (const label of ['Employee Id', 'SSN No', 'SIN No', "Driver's License Number", 'Date of Birth']) {
  105 |       const field = myInfo.restrictedField(label);
  106 |       if (await field.count() > 0) await expect(field).not.toBeEditable();
  107 |     }
  108 |   });
  109 | });
  110 | 
  111 | test.describe('My Info - Contact Details', { tag: '@regression' }, () => {
  112 |   test('ESS user can view contact details and contact information fields', async ({ page }) => {
  113 |     const dashboard = await loginAsEss(page);
  114 |     const contactDetails = new ContactDetailsPage(page);
```