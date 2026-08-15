import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import testData from '../test-data/test-data.json';

test.describe('Login - Valid Login', () => {
  test('should log in and display Dashboard', async ({ page }) => {
    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);

    await login.goto();
    await login.login(testData.credentials.admin.username, testData.credentials.admin.password);

    await expect(page).toHaveURL(/.*dashboard\/index/);
    await expect(dashboard.dashboardMenuItem).toBeVisible();
  });
});

test.describe('Login - Invalid Login', () => {
  test('shows an error and stays on login page', async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.login('InvalidUser', 'InvalidPassword');

    await expect(login.errorAlert).toBeVisible();
    await expect(login.errorAlert).toHaveText(/Invalid credentials/i);
    await expect(page).toHaveURL(/.*auth\/login/);
  });
});

test.describe('Login - Empty Fields Validation', () => {
  test('shows required messages and prevents login', async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.usernameInput.fill('');
    await login.passwordInput.fill('');
    await login.submit();

    await expect(login.usernameRequired).toBeVisible();
    await expect(login.usernameRequired).toHaveText(/Required/i);
    await expect(login.passwordRequired).toBeVisible();
    await expect(login.passwordRequired).toHaveText(/Required/i);

    await expect(page).toHaveURL(/.*auth\/login/);
  });
});

test.describe('Login - Password Masking', () => {
  test('password characters are masked and login succeeds', async ({ page }) => {
    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);

    await login.goto();
    await login.usernameInput.fill(testData.credentials.admin.username);
    await login.passwordInput.fill(testData.credentials.admin.password);

    await expect(login.passwordInput).toHaveAttribute('type', 'password');

    await login.loginButton.click();

    await expect(page).toHaveURL(/.*dashboard\/index/);
    await expect(dashboard.dashboardMenuItem).toBeVisible();
  });
});

test.describe('Login - Logout', () => {
  test('logs out and returns to login page with username visible', async ({ page }) => {
    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);

    await login.goto();
    await login.login(testData.credentials.admin.username, testData.credentials.admin.password);

    await expect(page).toHaveURL(/.*dashboard\/index/);
    await expect(dashboard.dashboardMenuItem).toBeVisible();

    await dashboard.openUserMenu();
    await dashboard.logout();

    await expect(page).toHaveURL(/.*auth\/login/);
    await expect(login.usernameInput).toBeVisible();
  });
});
