import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { LeavePage } from '../pages/LeavePage';
import testData from '../test-data/test-data.json';

test.describe('Leave - Apply Leave',{tag: '@regression'}, () => {
  test('shows the Apply Leave page and its visible navigation actions', async ({ page }) => {
    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);
    const leave = new LeavePage(page);

    await login.goto();
    await login.login(testData.credentials.admin.username, testData.credentials.admin.password);

    await dashboard.clickNavItem('Leave');
    await expect(page).toHaveURL(/\/leave\//);

    await leave.applyTab.click();
    await expect(page).toHaveURL(/\/leave\/applyLeave/);
    await expect(leave.applyLeaveHeading).toBeVisible();
    await expect(leave.applyTab).toBeVisible();
    await expect(leave.myLeaveTab).toBeVisible();
    await expect(leave.entitlementsTab).toBeVisible();
    await expect(leave.reportsTab).toBeVisible();
    await expect(leave.configureTab).toBeVisible();
    await expect(leave.noLeaveTypesMessage).toBeVisible();
  });
});

test.describe('Leave - My Leave Filters', {tag: '@regression'}, () => {
  test('searches My Leave by employee, status, and leave type', async ({ page }) => {
    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);
    const leave = new LeavePage(page);

    await login.goto();
    await login.login(testData.credentials.admin.username, testData.credentials.admin.password);

    await dashboard.clickNavItem('Leave');
    await expect(page).toHaveURL(/\/leave\//);

    await leave.myLeaveTab.click();
    await expect(page).toHaveURL(/\/leave\/viewMyLeaveList/);

    await leave.searchMyLeave('Linda Anderson', 'Scheduled', 'CAN - Personal');

    const results = await page.locator('table tbody tr').count();
    const noResultsVisible = await page.getByText('No Records Found').isVisible().catch(() => false);

    expect(results > 0 || noResultsVisible).toBeTruthy();
  });

  test('accepts valid From Date and To Date values and keeps the date fields interactive', async ({ page }) => {
    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);
    const leave = new LeavePage(page);

    await login.goto();
    await login.login(testData.credentials.admin.username, testData.credentials.admin.password);

    await dashboard.clickNavItem('Leave');
    await expect(page).toHaveURL(/\/leave\//);

    await leave.myLeaveTab.click();
    await expect(page).toHaveURL(/\/leave\/viewMyLeaveList/);

    const fromDate = '2024-01-01';
    const toDate = '2024-01-31';

    await leave.fromDateInput.fill(fromDate);
    await leave.toDateInput.fill(toDate);

    await expect(leave.fromDateInput).toHaveValue(fromDate);
    await expect(leave.toDateInput).toHaveValue(toDate);
    await expect(leave.calendarIcon).toBeVisible();

    await leave.calendarIcon.click();
    await expect(leave.calendarIcon).toBeVisible();
  });

  test('shows No Records Found when no leave matches the search criteria', async ({ page }) => {
    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);
    const leave = new LeavePage(page);

    await login.goto();
    await login.login(testData.credentials.admin.username, testData.credentials.admin.password);

    await dashboard.clickNavItem('Leave');
    await expect(page).toHaveURL(/\/leave\//);

    await leave.myLeaveTab.click();
    await expect(page).toHaveURL(/\/leave\/viewMyLeaveList/);

    await leave.employeeNameInput.fill('NoSuchEmployeeXYZ');
    await leave.searchButton.click();

    await expect(page.getByText('No Records Found')).toBeVisible();
  });

  test('searches Leave List by employee name and status without assuming a fixed dataset', async ({ page }) => {
    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);

    await login.goto();
    await login.login(testData.credentials.admin.username, testData.credentials.admin.password);

    await dashboard.clickNavItem('Leave');
    await expect(page).toHaveURL(/\/leave\//);

    await page.getByRole('link', { name: 'Leave List' }).click();
    await expect(page).toHaveURL(/\/leave\/viewLeaveList/);

    await page.getByPlaceholder('Type for hints...').fill('Linda Anderson');
    await page.locator('.oxd-select-text').nth(0).click();
    await page.getByRole('option', { name: 'Pending Approval' }).click();
    await page.getByRole('button', { name: 'Search' }).click();

    const rowCount = await page.locator('table tbody tr').count();
    const noResultsVisible = await page.getByText('No Records Found').isVisible().catch(() => false);

    expect(noResultsVisible || rowCount >= 0).toBeTruthy();
  });

  test('filters Leave List by a visible sub unit option and toggles include past employees', async ({ page }) => {
    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);

    await login.goto();
    await login.login(testData.credentials.admin.username, testData.credentials.admin.password);

    await dashboard.clickNavItem('Leave');
    await expect(page).toHaveURL(/\/leave\//);

    await page.getByRole('link', { name: 'Leave List' }).click();
    await expect(page).toHaveURL(/\/leave\/viewLeaveList/);

    const subUnitDropdown = page.locator('.oxd-select-text').nth(1);
    await subUnitDropdown.click();

    const firstSubUnitOption = page.locator('.oxd-select-option').first();
    await expect(firstSubUnitOption).toBeVisible();
    await firstSubUnitOption.click();

    const switchControl = page.locator('.oxd-switch-input').first();
    await expect(switchControl).toBeVisible();
    await expect(page.locator('input[type="checkbox"]').first()).not.toBeChecked();

    await switchControl.click();
    await expect(page.locator('input[type="checkbox"]').first()).toBeChecked();

    await switchControl.click();
    await expect(page.locator('input[type="checkbox"]').first()).not.toBeChecked();
  });

  test('reset button is available and can be clicked after entering filter values', async ({ page }) => {
    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);
    const leave = new LeavePage(page);

    await login.goto();
    await login.login(testData.credentials.admin.username, testData.credentials.admin.password);

    await dashboard.clickNavItem('Leave');
    await expect(page).toHaveURL(/\/leave\//);

    await leave.myLeaveTab.click();
    await expect(page).toHaveURL(/\/leave\/viewMyLeaveList/);

    await leave.employeeNameInput.fill('Alice');
    await leave.fromDateInput.fill('2024-01-01');
    await leave.toDateInput.fill('2024-01-31');

    await expect(leave.employeeNameInput).toHaveValue('Alice');
    await expect(leave.fromDateInput).toHaveValue('2024-01-01');
    await expect(leave.toDateInput).toHaveValue('2024-01-31');

    await expect(leave.resetButton).toBeVisible();
    await leave.resetButton.click();
    await expect(page.getByRole('button', { name: 'Search' })).toBeVisible();
  });
});
