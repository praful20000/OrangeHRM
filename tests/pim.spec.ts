import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import { PimPage } from '../pages/PimPage';
import path from 'path';
import testData from '../test-data/test-data.json';

test.describe('PIM - Add Employee', () => {
  test('Add Employee with valid details', async ({ page }) => {
    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);
    const pim = new PimPage(page);

    await login.goto();
    await login.login(testData.credentials.admin.username, testData.credentials.admin.password);

    await dashboard.clickNavItem('PIM');
    await expect(page).toHaveURL(/\/pim\//);

    await pim.openAddEmployee();

    await pim.addEmployee(testData.employees[0].firstName, testData.employees[0].middleName, testData.employees[0].lastName, testData.employees[0].employeeId);

    // If Employee Id duplicate, clear id and save again (let system assign id)
    const duplicate = page.getByText('Employee Id already exists');
    try {
      await duplicate.waitFor({ state: 'visible', timeout: 3000 });
      const form = page.locator('form').first();
      const inputs = form.locator('input:not([type="file"])');
      await inputs.nth(3).fill('');
      await form.getByRole('button', { name: 'Save' }).click();
    } catch (e) {
      // no duplicate error, continue
    }

    // verify saved: landed on Personal Details (employee profile)
    await expect(page).toHaveURL(/\/pim\/viewPersonalDetails/, { timeout: 10000 });
    await expect(page.getByText('Personal Details').first()).toBeVisible();
  });

  test('Required field validation on Add Employee', async ({ page }) => {
    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);
    const pim = new PimPage(page);

    await login.goto();
    await login.login(testData.credentials.admin.username, testData.credentials.admin.password);

    await dashboard.clickNavItem('PIM');
    await expect(page).toHaveURL(/\/pim\//);

    await pim.openAddEmployee();

    // clear first and last name fields and attempt save
    const form = page.locator('form').first();
    const inputs = form.locator('input:not([type="file"])');
    await inputs.nth(0).fill(''); // First Name
    await inputs.nth(2).fill(''); // Last Name

    await form.getByRole('button', { name: 'Save' }).click();

    // Expect validation messages shown and remain on addEmployee page
    await expect(page.locator('.oxd-input-field-error-message').first()).toBeVisible();
    await expect(page).toHaveURL(/\/pim\/addEmployee/);
  });

  test('Duplicate Employee Id validation', async ({ page }) => {
    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);
    const pim = new PimPage(page);

    await login.goto();
    await login.login(testData.credentials.admin.username, testData.credentials.admin.password);

    await dashboard.clickNavItem('PIM');
    await expect(page).toHaveURL(/\/pim\//);

    // Use a deterministic seed ID for stability (timestamp-based)
    const seedId = `EMP${Date.now().toString().slice(-6)}`;

    // create seed employee with known ID
    await pim.openAddEmployee();
    await pim.addEmployee(testData.seedEmployee.firstName, testData.seedEmployee.middleName, testData.seedEmployee.lastName, seedId);

    // attempt to add another employee using same id
    await pim.openAddEmployee();
    await pim.addEmployee(testData.duplicateEmployee.firstName, testData.duplicateEmployee.middleName, testData.duplicateEmployee.lastName, seedId);

    // after save, either the duplicate validation keeps us on add page, or the app navigates away
    const stayedOnAdd = await page.waitForURL(/\/pim\/addEmployee/, { timeout: 3000 }).then(() => true).catch(() => false);
    // assert we remained on the Add Employee page (validation prevented save)
    await expect(stayedOnAdd).toBeTruthy();
  });

  test('Profile image upload', async ({ page }) => {
    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);
    const pim = new PimPage(page);

    await login.goto();
    await login.login(testData.credentials.admin.username, testData.credentials.admin.password);

    await dashboard.clickNavItem('PIM');
    await expect(page).toHaveURL(/\/pim\//);

    await pim.openAddEmployee();

    // create tiny image payload (content stored in test-data)
    const filePayload = [{ name: 'profile.jpg', mimeType: 'image/jpeg', buffer: Buffer.from(testData.files.profilePngBase64, 'base64') }];

    // upload photo and save
    await pim.addEmployee(testData.profileEmployee.firstName, testData.profileEmployee.middleName, testData.profileEmployee.lastName, testData.profileEmployee.employeeId, filePayload);

    // wait for success toast then profile page
    await expect(page.getByText('Successfully Saved')).toBeVisible({ timeout: 10000 });
    await page.waitForURL(/\/pim\/viewPersonalDetails/, { timeout: 10000 });

    // verify profile image visible on profile page
    const profileImg = page.getByRole('img', { name: 'profile picture' }).first();
    await expect(profileImg).toBeVisible();
  });

  test('Invalid profile image upload (reject PDF)', async ({ page }) => {
    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);
    const pim = new PimPage(page);

    await login.goto();
    await login.login(testData.credentials.admin.username, testData.credentials.admin.password);

    await dashboard.clickNavItem('PIM');
    await expect(page).toHaveURL(/\/pim\//);

    await pim.openAddEmployee();

    // create dummy PDF payload (content stored in test-data)
    const pdfPayload = [{ name: 'profile.pdf', mimeType: 'application/pdf', buffer: Buffer.from(testData.files.pdfBase64, 'base64') }];

    // attempt upload and save
    await pim.addEmployee(testData.invalidEmployee.firstName, testData.invalidEmployee.middleName, testData.invalidEmployee.lastName, testData.invalidEmployee.employeeId, pdfPayload);

    // expect stayed on add page (validation prevented save)
    const stayedOnAdd = await page.waitForURL(/\/pim\/addEmployee/, { timeout: 3000 }).then(() => true).catch(() => false);
    await expect(stayedOnAdd).toBeTruthy();

    // expect validation message present (role=alert or generic field error)
    const validation = page.locator('[role="alert"], .oxd-input-field-error-message').first();
    await expect(validation).toBeVisible();
  });

  test('Create Login Details fields and options', async ({ page }) => {
    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);
    const pim = new PimPage(page);

    await login.goto();
    await login.login(testData.credentials.admin.username, testData.credentials.admin.password);

    await dashboard.clickNavItem('PIM');
    await expect(page).toHaveURL(/\/pim\//);

    await pim.openAddEmployee();

    // wait for any form loader/overlay to disappear before interacting
    await page.locator('.oxd-form-loader').waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
    const form = page.locator('form').first();
    // count inputs before toggling, then pick newly added inputs for username/password/confirm
    const formInputs = form.locator('input:not([type="file"])');
    const beforeCount = await formInputs.count();
    const checkbox = form.locator('input[type="checkbox"]').first();
    const isChecked = await checkbox.isChecked().catch(() => false);
    if (!isChecked) {
      await form.locator('.oxd-switch-input').first().click({ force: true });
      await page.waitForTimeout(200);
    }
    const afterInputs = form.locator('input:not([type="file"])');
    const username = afterInputs.nth(beforeCount);
    const password = afterInputs.nth(beforeCount + 1);
    const confirm = afterInputs.nth(beforeCount + 2);

    await expect(username).toBeVisible({ timeout: 5000 });
    await expect(password).toBeVisible({ timeout: 5000 });
    await expect(confirm).toBeVisible({ timeout: 5000 });

    await username.fill(testData.loginDetails.username);
    await password.fill(testData.loginDetails.password);
    await confirm.fill(testData.loginDetails.password);

    // verify that login inputs were added (at least 3 new inputs)
    const afterCount = await form.locator('input:not([type="file"])').count();
    await expect(afterCount).toBeGreaterThanOrEqual(beforeCount + 3);
  });

  test('Password mismatch validation on Create Login Details', async ({ page }) => {
    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);
    const pim = new PimPage(page);

    await login.goto();
    await login.login(testData.credentials.admin.username, testData.credentials.admin.password);

    await dashboard.clickNavItem('PIM');
    await expect(page).toHaveURL(/\/pim\//);

    await pim.openAddEmployee();

    // ensure form ready
    await page.locator('.oxd-form-loader').waitFor({ state: 'hidden', timeout: 5000 }).catch(() => {});
    const form = page.locator('form').first();

    // count inputs before toggling, click visible styled switch, wait for new inputs
    const inputsBefore = form.locator('input:not([type="file"])');
    const beforeCount = await inputsBefore.count();
    const checkbox = form.locator('input[type="checkbox"]').first();
    const isChecked = await checkbox.isChecked().catch(() => false);
    if (!isChecked) {
      // attempt robust toggles: label click, underlying checkbox click, styled switch fallback
      const label = form.locator('label', { hasText: 'Create Login Details' }).first();
      if ((await label.count()) > 0) {
        await label.scrollIntoViewIfNeeded();
        await label.click({ force: true });
      } else {
        const checkboxEl = form.locator('input[type="checkbox"]').first();
        if ((await checkboxEl.count()) > 0) {
          await checkboxEl.evaluate((el: HTMLElement) => (el as HTMLInputElement).click());
        } else {
          const switchEl = form.locator('.oxd-switch-input').first();
          if ((await switchEl.count()) > 0) await switchEl.click({ force: true });
        }
      }
    }

    // wait until password inputs appear inside form (scoped, robust)
    await expect.poll(async () => await form.locator('input[type="password"]').count(), { timeout: 10000 }).toBeGreaterThanOrEqual(2);

    // prefer password inputs by type for reliability
    const pwInputs = form.locator('input[type="password"]');
    const pwCount = await pwInputs.count();
    await expect(pwCount).toBeGreaterThanOrEqual(2);
    // attempt to find username input via common attributes, fallback to indexed input
    const usernameCandidates = [
      form.locator('input[placeholder*=Username]'),
      form.locator('input[aria-label*=Username]'),
      form.locator('input[name*=user]'),
      form.locator('input[id*=user]'),
    ];
    let username = null;
    for (const cand of usernameCandidates) {
      if ((await cand.count()) > 0) { username = cand.first(); break; }
    }
    if (!username) {
      const afterInputs = form.locator('input:not([type="file"])');
      username = afterInputs.nth(beforeCount);
    }

    await expect(username).toBeVisible({ timeout: 2000 });
    await expect(pwInputs.nth(0)).toBeVisible({ timeout: 2000 });
    await expect(pwInputs.nth(1)).toBeVisible({ timeout: 2000 });

    await username.fill(testData.loginDetails.username);
    await pwInputs.nth(0).fill(testData.loginDetails.password);
    await pwInputs.nth(1).fill(testData.loginDetails.mismatchPassword); // deliberate mismatch

    await form.getByRole('button', { name: 'Save' }).click();

    // expect validation message shown and remain on add page
    const validation = page.locator('[role="alert"], .oxd-input-field-error-message').first();
    await expect(validation).toBeVisible({ timeout: 5000 });
    const stayedOnAdd = await page.waitForURL(/\/pim\/addEmployee/, { timeout: 3000 }).then(() => true).catch(() => false);
    await expect(stayedOnAdd).toBeTruthy();
  });

  test('Search Employee by Name', async ({ page }) => {
    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);
    const pim = new PimPage(page);

    const employeeName = testData.names.fullName;

    await login.goto();
    await login.login(testData.credentials.admin.username, testData.credentials.admin.password);

    await dashboard.clickNavItem('PIM');
    await expect(page).toHaveURL(/\/pim\//);

    // open Employee List directly for stability
    await pim.openEmployeeList();
    await page.locator('.oxd-table').first().waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});

    // find employee name input using multiple fallbacks
    const nameCandidates = [
      page.getByPlaceholder('Type for hints...'),
      page.getByLabel('Employee Name'),
      page.locator('input[placeholder*="Employee"]'),
      page.locator('input[aria-label*="Employee"]'),
    ];
    let nameInput = null;
    for (const cand of nameCandidates) {
      if (await cand.count() > 0) { nameInput = cand.first(); break; }
    }
    if (!nameInput) throw new Error('Employee name input not found');

    await nameInput.fill(employeeName);
    await page.getByRole('button', { name: 'Search' }).first().click();

    // ensure row exists where both first and last name present in same row
    await expect.poll(async () => {
      return await page.getByRole('row').filter({ hasText: testData.employees[0].lastName }).filter({ hasText: testData.employees[0].firstName }).count();
    }, { timeout: 5000 }).toBeGreaterThan(0);
  });

  test('Search Employee by Employee ID', async ({ page }) => {
    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);
    const pim = new PimPage(page);

    const employeeId = testData.employees[0].employeeId;

    await login.goto();
    await login.login(testData.credentials.admin.username, testData.credentials.admin.password);

    await dashboard.clickNavItem('PIM');
    await expect(page).toHaveURL(/\/pim\//);

    await pim.openEmployeeList();
    await page.locator('.oxd-table').first().waitFor({ state: 'visible', timeout: 5000 }).catch(() => {});

    // try panel-scoped inputs first (more reliable)
    const searchPanel = page.locator('section', { hasText: 'Employee Information' }).first();
    let idInput = null;
    if (await searchPanel.count() > 0) {
      const panelInputs = searchPanel.locator('input');
      const panelCount = await panelInputs.count();
      if (panelCount > 1) {
        idInput = panelInputs.nth(1); // second input usually Employee Id
      }
    }
    if (!idInput) {
      // fallback: use role=textbox and pick second textbox (name=first, id=second)
      const textboxes = page.getByRole('textbox');
      if (await textboxes.count() > 1) idInput = textboxes.nth(1);
      else {
        const idCandidates = [
          page.getByLabel('Employee Id'),
          page.locator('input[placeholder*="Employee Id"]'),
          page.locator('input[aria-label*="Employee Id"]'),
          page.locator('input[name*="emp"]'),
        ];
        for (const cand of idCandidates) {
          if (await cand.count() > 0) { idInput = cand.first(); break; }
        }
      }
    }
    if (!idInput) throw new Error('Employee ID input not found');

    await idInput.fill(employeeId);
    await page.getByRole('button', { name: 'Search' }).first().click();

    const match = page.getByText(employeeId).first();
    await expect(match).toBeVisible({ timeout: 5000 });
  });

  test('Reset Search Filters', async ({ page }) => {
    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);
    const pim = new PimPage(page);

    await login.goto();
    await login.login(testData.credentials.admin.username, testData.credentials.admin.password);

    await dashboard.clickNavItem('PIM');
    await expect(page).toHaveURL(/\/pim\//);

    await pim.openEmployeeList();

    // locate inputs directly (more robust than panel selector)
    const nameInput = page.getByPlaceholder('Type for hints...').first();
    await nameInput.waitFor({ state: 'visible', timeout: 8000 });
    const textboxes = page.getByRole('textbox');
    const idInput = (await textboxes.count()) > 1 ? textboxes.nth(1) : page.locator('input').nth(1);
    const supervisorInput = page.getByPlaceholder('Type for hints...').nth(1);

    await nameInput.fill(testData.names.fullName);
    await idInput.fill(testData.employees[0].employeeId);
    if (await supervisorInput.count() > 0) await supervisorInput.fill(testData.supervisor);

    // blur fields to close any autocomplete, then click Reset
    await idInput.press('Tab').catch(() => {});
    await page.waitForTimeout(200);
    await page.getByRole('button', { name: 'Reset' }).first().click();

    // verify fields cleared (poll page textboxes to handle dynamic updates)
    const tb = page.getByRole('textbox');
    await expect.poll(async () => await tb.nth(0).inputValue(), { timeout: 5000 }).toBe('');
    await expect.poll(async () => await tb.nth(1).inputValue(), { timeout: 5000 }).toBe('');
    if (await supervisorInput.count() > 0) await expect.poll(async () => await supervisorInput.inputValue(), { timeout: 5000 }).toBe('');
  });
});
