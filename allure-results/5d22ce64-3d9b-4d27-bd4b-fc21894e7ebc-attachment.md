# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: dashboard.spec.ts >> Dashboard - Navigation >> left navigation links navigate to correct pages
- Location: tests\dashboard.spec.ts:25:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.waitFor: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('a[href*="/web/index.php/recruitment/viewRecruitmentModule"]').first() to be visible

```

# Test source

```ts
  1  | import { Page } from '@playwright/test';
  2  | 
  3  | export class DashboardPage {
  4  |   readonly page: Page;
  5  |   readonly dashboardMenuItem;
  6  |   readonly profileTab;
  7  |   readonly logoutLink;
  8  |   readonly leftNav;
  9  |   readonly widgets;
  10 |   readonly userName;
  11 | 
  12 |   constructor(page: Page) {
  13 |     this.page = page;
  14 |     this.dashboardMenuItem = page.getByText('Dashboard').first();
  15 |     this.profileTab = page.locator('.oxd-userdropdown-tab');
  16 |     this.logoutLink = page.getByRole('menuitem', { name: 'Logout' });
  17 |     this.leftNav = page.getByRole('navigation', { name: 'Sidepanel' });
  18 |     this.widgets = page.locator('.orangehrm-dashboard-widget');
  19 |     this.userName = page.locator('.oxd-userdropdown-name');
  20 |   }
  21 | 
  22 |   async isLoaded() {
  23 |     await this.dashboardMenuItem.waitFor({ state: 'visible' });
  24 |     return this.dashboardMenuItem.isVisible();
  25 |   }
  26 | 
  27 |   async openUserMenu() {
  28 |     await this.profileTab.click();
  29 |   }
  30 | 
  31 |   async logout() {
  32 |     await this.logoutLink.click();
  33 |   }
  34 | 
  35 |   async isLeftNavVisible() {
  36 |     return this.leftNav.isVisible();
  37 |   }
  38 | 
  39 |   async widgetsCount() {
  40 |     return this.widgets.count();
  41 |   }
  42 | 
  43 |   async getUserNameText() {
  44 |     return this.userName.textContent();
  45 |   }
  46 | 
  47 |   async clickNavItem(name: string) {
  48 |     const routeMap: Record<string, string> = {
  49 |       Admin: '/web/index.php/admin/viewSystemUsers',
  50 |       PIM: '/web/index.php/pim/viewPimModule',
  51 |       Leave: '/web/index.php/leave/viewLeaveModule',
  52 |       Time: '/web/index.php/time/viewTimeModule',
  53 |       Recruitment: '/web/index.php/recruitment/viewRecruitmentModule',
  54 |       Dashboard: '/web/index.php/dashboard/index',
  55 |       MyInfo: '/web/index.php/pim/viewMyDetails',
  56 |     };
  57 | 
  58 |     const route = routeMap[name];
  59 |     if (!route) {
  60 |       throw new Error(`Unsupported navigation item: ${name}`);
  61 |     }
  62 | 
  63 |     if (name === 'Dashboard') {
  64 |       await this.page.goto(`https://opensource-demo.orangehrmlive.com${route}`);
  65 |       await this.page.waitForURL(/\/dashboard\/index/);
  66 |       return;
  67 |     }
  68 | 
  69 |     const link = name === 'Admin'
  70 |       ? this.page.getByText('Admin', { exact: true }).first()
  71 |       : this.page.locator(`a[href*="${route}"]`).first();
> 72 |     await link.waitFor({ state: 'visible', timeout: 15000 });
     |                ^ Error: locator.waitFor: Test timeout of 30000ms exceeded.
  73 |     await link.click();
  74 |   }
  75 | 
  76 |   async clickQuickLaunch(name: string) {
  77 |     const button = this.page.getByRole('button', { name, exact: true }).first();
  78 |     await button.waitFor({ state: 'visible', timeout: 15000 });
  79 |     await button.click();
  80 |   }
  81 | }
  82 | 
```