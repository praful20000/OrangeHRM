# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: my-info.spec.ts >> My Info - Personal Details >> ESS user can view personal details and personal information fields
- Location: tests\my-info.spec.ts:8:7

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
  1  | import { test, expect } from '@playwright/test';
  2  | import { LoginPage } from '../pages/LoginPage';
  3  | import { DashboardPage } from '../pages/DashboardPage';
  4  | import { MyInfoPage } from '../pages/MyInfoPage';
  5  | import testData from '../test-data/test-data.json';
  6  | 
  7  | test.describe('My Info - Personal Details', { tag: '@regression' }, () => {
  8  |   test('ESS user can view personal details and personal information fields', async ({ page }) => {
  9  |     const login = new LoginPage(page);
  10 |     const dashboard = new DashboardPage(page);
  11 |     const myInfo = new MyInfoPage(page);
  12 | 
  13 |     await login.goto();
  14 |     await login.login(testData.loginDetails.username, testData.loginDetails.password);
  15 | 
> 16 |     await expect(page).toHaveURL(/\/dashboard\/index/);
     |                        ^ Error: expect(page).toHaveURL(expected) failed
  17 | 
  18 |     await dashboard.clickNavItem('MyInfo');
  19 |     await expect(page).toHaveURL(/\/pim\/viewPersonalDetails\//);
  20 | 
  21 |     await expect(myInfo.personalDetailsHeading).toBeVisible();
  22 |     await expect(myInfo.firstNameInput).toBeVisible();
  23 |     await expect(myInfo.middleNameInput).toBeVisible();
  24 |     await expect(myInfo.lastNameInput).toBeVisible();
  25 |     await expect(myInfo.employeeIdInput).toBeVisible();
  26 |     await expect(myInfo.otherIdInput).toBeVisible();
  27 |     await expect(myInfo.driversLicenseInput).toBeVisible();
  28 |   });
  29 | });
```