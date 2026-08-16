import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';
import testData from '../test-data/test-data.json';

test.describe('Dashboard - Menus, Widgets, User Info', () => {
  test('shows left navigation, widgets, and user info after login', async ({ page }) => {
    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);

    await login.goto();
    await login.login(testData.credentials.admin.username, testData.credentials.admin.password);

    await expect(page).toHaveURL(/.*dashboard\/index/);
    await expect(dashboard.leftNav).toBeVisible();

    const count = await dashboard.widgetsCount();
    expect(count).toBeGreaterThan(0);

    await expect(dashboard.userName).toBeVisible();
  });
});

test.describe('Dashboard - Navigation',{tag: '@regression'}, () => {
  test('left navigation links navigate to correct pages', async ({ page }) => {
    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);

    await login.goto();
    await login.login(testData.credentials.admin.username, testData.credentials.admin.password);

    const navMap: {name: string; path: RegExp}[] = [
      { name: 'Admin', path: /\/admin\// },
      { name: 'PIM', path: /\/pim\// },
      { name: 'Leave', path: /\/leave\// },
      { name: 'Time', path: /\/time\// },
      { name: 'Recruitment', path: /\/recruitment\// },
    ];

    for (const item of navMap) {
      await dashboard.clickNavItem(item.name);
      await expect(page).toHaveURL(item.path);
      // return to Dashboard for next iteration
      await dashboard.clickNavItem('Dashboard');
      await expect(page).toHaveURL(/.*dashboard\/index/);
    }
  });

  test('quick launch links navigate to correct pages', async ({ page }) => {
    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);

    await login.goto();
    await login.login(testData.credentials.admin.username, testData.credentials.admin.password);

    const quickMap: {name: string; path: RegExp}[] = [
      { name: 'Admin', path: /\/admin\// },
      { name: 'PIM', path: /\/pim\// },
      { name: 'Leave', path: /\/leave\// },
    ];

    for (const item of quickMap) {
      await dashboard.clickQuickLaunch(item.name);
      await expect(page).toHaveURL(item.path);
      await dashboard.clickNavItem('Dashboard');
      await expect(page).toHaveURL(/.*dashboard\/index/);
    }
  });
});

test.describe('Dashboard - Refresh and Navigation', {tag: '@regression'},() => {
  test('refresh retains session and dashboard remains loaded', async ({ page }) => {
    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);

    await login.goto();
    await login.login(testData.credentials.admin.username, testData.credentials.admin.password);

    await expect(page).toHaveURL(/.*dashboard\/index/);
    await expect(dashboard.dashboardMenuItem).toBeVisible();

    await page.reload();

    await expect(page).toHaveURL(/.*dashboard\/index/);
    await expect(dashboard.dashboardMenuItem).toBeVisible();

    // navigate to another module and return
    await dashboard.clickNavItem('PIM');
    await expect(page).toHaveURL(/\/pim\//);

    await dashboard.clickNavItem('Dashboard');
    await expect(page).toHaveURL(/.*dashboard\/index/);

    // verify not logged out
    await expect(dashboard.userName).toBeVisible();
  });
});

test.describe('Dashboard - Authentication and Role Access',{tag: '@regression'}, () => {
  test('direct dashboard access redirects to login; login then shows role-appropriate dashboard', async ({ page }) => {
    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);

    // Open dashboard URL directly without logging in
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');

    // Expect redirected to login (login form visible)
    await expect(login.usernameInput).toBeVisible();

    // Login with valid credentials
    await login.login(testData.credentials.admin.username, testData.credentials.admin.password);

    // After login, dashboard should load
    await expect(dashboard.dashboardMenuItem).toBeVisible();

    // Verify dashboard widgets visible
    await expect(dashboard.widgets.first()).toBeVisible();

    // Verify role-specific UI: Admin nav present for Admin user
    const adminNav = page.getByText('Admin').first();
    await expect(adminNav).toBeVisible();
  });
});
