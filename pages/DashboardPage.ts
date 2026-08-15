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
    this.leftNav = page.locator('aside.oxd-sidepanel');
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
    await this.leftNav.waitFor({ state: 'visible' });
    const link = this.page.getByRole('link', { name }).first();
    await link.waitFor({ state: 'visible' });
    await link.click();
  }

  async clickQuickLaunch(name: string) {
    // quick launch items may be links or buttons; try both
    const link = this.page.getByRole('link', { name }).first();
    try {
      await link.waitFor({ state: 'visible', timeout: 2000 });
      await link.click();
      return;
    } catch (e) {}
    const button = this.page.getByRole('button', { name }).first();
    await button.waitFor({ state: 'visible' });
    await button.click();
  }
}
