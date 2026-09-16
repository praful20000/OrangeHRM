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
  - waiting for locator('aside.oxd-sidepanel') to be visible

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
  17 |     this.leftNav = page.locator('aside.oxd-sidepanel');
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
> 48 |     await this.leftNav.waitFor({ state: 'visible' });
     |                        ^ Error: locator.waitFor: Test timeout of 30000ms exceeded.
  49 |     const link = this.page.getByRole('link', { name }).first();
  50 |     await link.waitFor({ state: 'visible' });
  51 |     await link.click();
  52 |   }
  53 | 
  54 |   async clickQuickLaunch(name: string) {
  55 |     // quick launch items may be links or buttons; try both
  56 |     const link = this.page.getByRole('link', { name }).first();
  57 |     try {
  58 |       await link.waitFor({ state: 'visible', timeout: 2000 });
  59 |       await link.click();
  60 |       return;
  61 |     } catch (e) {}
  62 |     const button = this.page.getByRole('button', { name }).first();
  63 |     await button.waitFor({ state: 'visible' });
  64 |     await button.click();
  65 |   }
  66 | }
  67 | 
```