import { Page } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly dashboardMenuItem;
  readonly profileTab;
  readonly logoutLink;
  readonly leftNav;
  readonly widgets;
  readonly userName;

  constructor(page: Page) {
    this.page = page;
    this.dashboardMenuItem = page.getByText('Dashboard').first();
    this.profileTab = page.locator('.oxd-userdropdown-tab');
    this.logoutLink = page.getByRole('menuitem', { name: 'Logout' });
    this.leftNav = page.getByRole('navigation', { name: 'Sidepanel' });
    this.widgets = page.locator('.orangehrm-dashboard-widget');
    this.userName = page.locator('.oxd-userdropdown-name');
  }

  async isLoaded() {
    await this.dashboardMenuItem.waitFor({ state: 'visible' });
    return this.dashboardMenuItem.isVisible();
  }

  async openUserMenu() {
    await this.profileTab.click();
  }

  async logout() {
    await this.logoutLink.click();
  }

  async isLeftNavVisible() {
    return this.leftNav.isVisible();
  }

  async widgetsCount() {
    return this.widgets.count();
  }

  async getUserNameText() {
    return this.userName.textContent();
  }

  async clickNavItem(name: string) {
    const routeMap: Record<string, string> = {
      Admin: '/web/index.php/admin/viewSystemUsers',
      PIM: '/web/index.php/pim/viewPimModule',
      Leave: '/web/index.php/leave/viewLeaveModule',
      Time: '/web/index.php/time/viewTimeModule',
      Recruitment: '/web/index.php/recruitment/viewRecruitmentModule',
      Dashboard: '/web/index.php/dashboard/index',
      MyInfo: '/web/index.php/pim/viewMyDetails',
    };

    const route = routeMap[name];
    if (!route) {
      throw new Error(`Unsupported navigation item: ${name}`);
    }

    if (name === 'Dashboard') {
      await this.page.goto(`https://opensource-demo.orangehrmlive.com${route}`);
      await this.page.waitForURL(/\/dashboard\/index/);
      return;
    }

    const link = name === 'Admin'
      ? this.page.getByText('Admin', { exact: true }).first()
      : this.page.locator(`a[href*="${route}"]`).first();
    await link.waitFor({ state: 'visible', timeout: 15000 });
    await link.click();
  }

  async clickQuickLaunch(name: string) {
    const button = this.page.getByRole('button', { name, exact: true }).first();
    await button.waitFor({ state: 'visible', timeout: 15000 });
    await button.click();
  }
}
