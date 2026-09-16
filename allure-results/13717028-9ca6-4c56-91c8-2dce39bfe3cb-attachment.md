# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: leave.spec.ts >> Leave - My Leave Filters >> accepts valid From Date and To Date values and keeps the date fields interactive
- Location: tests\leave.spec.ts:54:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('input[placeholder="yyyy-dd-mm"]').first()

```

# Test source

```ts
  1   | import { test, expect } from '@playwright/test';
  2   | import { LoginPage } from '../pages/LoginPage';
  3   | import { DashboardPage } from '../pages/DashboardPage';
  4   | import { LeavePage } from '../pages/LeavePage';
  5   | import testData from '../test-data/test-data.json';
  6   | 
  7   | test.describe('Leave - Apply Leave',{tag: '@regression'}, () => {
  8   |   test('shows the Apply Leave page and its visible navigation actions', async ({ page }) => {
  9   |     const login = new LoginPage(page);
  10  |     const dashboard = new DashboardPage(page);
  11  |     const leave = new LeavePage(page);
  12  | 
  13  |     await login.goto();
  14  |     await login.login(testData.credentials.admin.username, testData.credentials.admin.password);
  15  | 
  16  |     await dashboard.clickNavItem('Leave');
  17  |     await expect(page).toHaveURL(/\/leave\//);
  18  | 
  19  |     await leave.applyTab.click();
  20  |     await expect(page).toHaveURL(/\/leave\/applyLeave/);
  21  |     await expect(leave.applyLeaveHeading).toBeVisible();
  22  |     await expect(leave.applyTab).toBeVisible();
  23  |     await expect(leave.myLeaveTab).toBeVisible();
  24  |     await expect(leave.entitlementsTab).toBeVisible();
  25  |     await expect(leave.reportsTab).toBeVisible();
  26  |     await expect(leave.configureTab).toBeVisible();
  27  |     await expect(leave.noLeaveTypesMessage).toBeVisible();
  28  |   });
  29  | });
  30  | 
  31  | test.describe('Leave - My Leave Filters', {tag: '@regression'}, () => {
  32  |   test('searches My Leave by employee, status, and leave type', async ({ page }) => {
  33  |     const login = new LoginPage(page);
  34  |     const dashboard = new DashboardPage(page);
  35  |     const leave = new LeavePage(page);
  36  | 
  37  |     await login.goto();
  38  |     await login.login(testData.credentials.admin.username, testData.credentials.admin.password);
  39  | 
  40  |     await dashboard.clickNavItem('Leave');
  41  |     await expect(page).toHaveURL(/\/leave\//);
  42  | 
  43  |     await leave.myLeaveTab.click();
  44  |     await expect(page).toHaveURL(/\/leave\/viewMyLeaveList/);
  45  | 
  46  |     await leave.searchMyLeave('Linda Anderson', 'Scheduled', 'CAN - Personal');
  47  | 
  48  |     const results = await page.locator('table tbody tr').count();
  49  |     const noResultsVisible = await page.getByText('No Records Found').isVisible().catch(() => false);
  50  | 
  51  |     expect(results > 0 || noResultsVisible).toBeTruthy();
  52  |   });
  53  | 
  54  |   test('accepts valid From Date and To Date values and keeps the date fields interactive', async ({ page }) => {
  55  |     const login = new LoginPage(page);
  56  |     const dashboard = new DashboardPage(page);
  57  |     const leave = new LeavePage(page);
  58  | 
  59  |     await login.goto();
  60  |     await login.login(testData.credentials.admin.username, testData.credentials.admin.password);
  61  | 
  62  |     await dashboard.clickNavItem('Leave');
  63  |     await expect(page).toHaveURL(/\/leave\//);
  64  | 
  65  |     await leave.myLeaveTab.click();
  66  |     await expect(page).toHaveURL(/\/leave\/viewMyLeaveList/);
  67  | 
  68  |     const fromDate = '2024-01-01';
  69  |     const toDate = '2024-01-31';
  70  | 
> 71  |     await leave.fromDateInput.fill(fromDate);
      |                               ^ Error: locator.fill: Test timeout of 30000ms exceeded.
  72  |     await leave.toDateInput.fill(toDate);
  73  | 
  74  |     await expect(leave.fromDateInput).toHaveValue(fromDate);
  75  |     await expect(leave.toDateInput).toHaveValue(toDate);
  76  |     await expect(leave.calendarIcon).toBeVisible();
  77  | 
  78  |     await leave.calendarIcon.click();
  79  |     await expect(leave.calendarIcon).toBeVisible();
  80  |   });
  81  | 
  82  |   test('shows No Records Found when no leave matches the search criteria', async ({ page }) => {
  83  |     const login = new LoginPage(page);
  84  |     const dashboard = new DashboardPage(page);
  85  |     const leave = new LeavePage(page);
  86  | 
  87  |     await login.goto();
  88  |     await login.login(testData.credentials.admin.username, testData.credentials.admin.password);
  89  | 
  90  |     await dashboard.clickNavItem('Leave');
  91  |     await expect(page).toHaveURL(/\/leave\//);
  92  | 
  93  |     await leave.myLeaveTab.click();
  94  |     await expect(page).toHaveURL(/\/leave\/viewMyLeaveList/);
  95  | 
  96  |     await leave.employeeNameInput.fill('NoSuchEmployeeXYZ');
  97  |     await leave.searchButton.click();
  98  | 
  99  |     await expect(page.getByText('No Records Found')).toBeVisible();
  100 |   });
  101 | 
  102 |   test('searches Leave List by employee name and status without assuming a fixed dataset', async ({ page }) => {
  103 |     const login = new LoginPage(page);
  104 |     const dashboard = new DashboardPage(page);
  105 | 
  106 |     await login.goto();
  107 |     await login.login(testData.credentials.admin.username, testData.credentials.admin.password);
  108 | 
  109 |     await dashboard.clickNavItem('Leave');
  110 |     await expect(page).toHaveURL(/\/leave\//);
  111 | 
  112 |     await page.getByRole('link', { name: 'Leave List' }).click();
  113 |     await expect(page).toHaveURL(/\/leave\/viewLeaveList/);
  114 | 
  115 |     await page.getByPlaceholder('Type for hints...').fill('Linda Anderson');
  116 |     await page.locator('.oxd-select-text').nth(0).click();
  117 |     await page.getByRole('option', { name: 'Pending Approval' }).click();
  118 |     await page.getByRole('button', { name: 'Search' }).click();
  119 | 
  120 |     const rowCount = await page.locator('table tbody tr').count();
  121 |     const noResultsVisible = await page.getByText('No Records Found').isVisible().catch(() => false);
  122 | 
  123 |     expect(noResultsVisible || rowCount >= 0).toBeTruthy();
  124 |   });
  125 | 
  126 |   test('filters Leave List by a visible sub unit option and toggles include past employees', async ({ page }) => {
  127 |     const login = new LoginPage(page);
  128 |     const dashboard = new DashboardPage(page);
  129 | 
  130 |     await login.goto();
  131 |     await login.login(testData.credentials.admin.username, testData.credentials.admin.password);
  132 | 
  133 |     await dashboard.clickNavItem('Leave');
  134 |     await expect(page).toHaveURL(/\/leave\//);
  135 | 
  136 |     await page.getByRole('link', { name: 'Leave List' }).click();
  137 |     await expect(page).toHaveURL(/\/leave\/viewLeaveList/);
  138 | 
  139 |     const subUnitDropdown = page.locator('.oxd-select-text').nth(1);
  140 |     await subUnitDropdown.click();
  141 | 
  142 |     const firstSubUnitOption = page.locator('.oxd-select-option').first();
  143 |     await expect(firstSubUnitOption).toBeVisible();
  144 |     await firstSubUnitOption.click();
  145 | 
  146 |     const switchControl = page.locator('.oxd-switch-input').first();
  147 |     await expect(switchControl).toBeVisible();
  148 |     await expect(page.locator('input[type="checkbox"]').first()).not.toBeChecked();
  149 | 
  150 |     await switchControl.click();
  151 |     await expect(page.locator('input[type="checkbox"]').first()).toBeChecked();
  152 | 
  153 |     await switchControl.click();
  154 |     await expect(page.locator('input[type="checkbox"]').first()).not.toBeChecked();
  155 |   });
  156 | 
  157 |   test('reset button is available and can be clicked after entering filter values', async ({ page }) => {
  158 |     const login = new LoginPage(page);
  159 |     const dashboard = new DashboardPage(page);
  160 |     const leave = new LeavePage(page);
  161 | 
  162 |     await login.goto();
  163 |     await login.login(testData.credentials.admin.username, testData.credentials.admin.password);
  164 | 
  165 |     await dashboard.clickNavItem('Leave');
  166 |     await expect(page).toHaveURL(/\/leave\//);
  167 | 
  168 |     await leave.myLeaveTab.click();
  169 |     await expect(page).toHaveURL(/\/leave\/viewMyLeaveList/);
  170 | 
  171 |     await leave.employeeNameInput.fill('Alice');
```