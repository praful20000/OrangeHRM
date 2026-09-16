import { Page } from '@playwright/test';

export class LeavePage {
  readonly page: Page;
  readonly leaveMenuItem;
  readonly applyLeaveHeading;
  readonly applyTab;
  readonly myLeaveTab;
  readonly entitlementsTab;
  readonly reportsTab;
  readonly reportHeading;
  readonly leavePeriodSelect;
  readonly generateButton;
  readonly recordsFound;
  readonly configureTab;
  readonly noLeaveTypesMessage;
  readonly employeeNameInput;
  readonly statusFilter;
  readonly leaveTypeFilter;
  readonly searchButton;
  readonly resetButton;
  readonly fromDateInput;
  readonly toDateInput;
  readonly calendarIcon;
  readonly calendarPicker;

  constructor(page: Page) {
    this.page = page;
    this.leaveMenuItem = page.locator('a[href*="/leave/viewLeaveModule"]').first();
    this.applyLeaveHeading = page.getByRole('heading', { name: 'Apply Leave' });
    this.applyTab = page.getByRole('link', { name: 'Apply' }).first();
    this.myLeaveTab = page.getByRole('link', { name: 'My Leave' }).first();
    this.entitlementsTab = page.getByText('Entitlements').first();
    this.reportsTab = page.getByText('Reports').first();
    this.reportHeading = page.getByRole('heading', { name: 'Leave Entitlements and Usage Report' });
    this.leavePeriodSelect = page.locator('.oxd-select-text').nth(1);
    this.generateButton = page.getByRole('button', { name: 'Generate' });
    this.recordsFound = page.getByText(/\(\d+\) Records Found/);
    this.configureTab = page.getByText('Configure').first();
    this.noLeaveTypesMessage = page.getByText('No Leave Types with Leave Balance');
    this.employeeNameInput = page.locator('input[placeholder="Search"], input[placeholder="Type for hints..."]').first();
    this.statusFilter = page.locator('div').filter({ hasText: 'Show Leave with Status' }).first();
    this.leaveTypeFilter = page.locator('div').filter({ hasText: 'Leave Type' }).first();
    this.searchButton = page.getByRole('button', { name: 'Search' }).first();
    this.resetButton = page.getByRole('button', { name: 'Reset' }).first();
    this.fromDateInput = page.locator('input[placeholder="yyyy-dd-mm"]').nth(0);
    this.toDateInput = page.locator('input[placeholder="yyyy-dd-mm"]').nth(1);
    this.calendarIcon = page.locator('.oxd-date-input-icon').first();
    this.calendarPicker = page.locator('.oxd-calendar').first();
  }

  async navigateToApplyLeave() {
    await this.leaveMenuItem.click();
    await this.page.waitForURL(/\/leave\//);

    await this.applyTab.click();
    await this.page.waitForURL(/\/leave\/applyLeave/);
  }

  async openMyLeave() {
    await this.myLeaveTab.click();
    await this.page.waitForURL(/\/leave\/viewMyLeaveList/);
  }

  async openLeaveEntitlementsReport() {
    await this.reportsTab.click();
    await this.page.getByRole('menuitem', { name: 'Leave Entitlements and Usage Report', exact: true }).click();
    await this.page.waitForURL(/\/leave\/viewLeaveBalanceReport/);
  }

  async selectCurrentYearReportDetails(leaveType: string) {
    const currentYear = new Date().getFullYear();
    const currentYearPeriod = `${currentYear}-01-01 - ${currentYear}-31-12`;

    await this.page.locator('.oxd-select-text').nth(0).click();
    const leaveTypeOption = this.page.getByRole('option', { name: leaveType, exact: true });
    if (await leaveTypeOption.count()) {
      await leaveTypeOption.click();
    } else {
      await this.page.locator('.oxd-select-option').first().click();
    }
    await this.leavePeriodSelect.click();
    const periodOption = this.page.getByRole('option', { name: currentYearPeriod, exact: true });
    if (await periodOption.count()) {
      await periodOption.click();
    } else {
      await this.page.locator('.oxd-select-option').first().click();
    }
  }

  async generateReport() {
    await this.generateButton.click();
  }

  async searchMyLeave(employeeName: string, status: string, leaveType: string) {
    const textInput = this.page.locator('input').first();
    if (await textInput.count()) {
      await textInput.fill(employeeName);
    }

    const statusOption = this.page.getByText(status, { exact: true }).first();
    if (await statusOption.count()) {
      await statusOption.click({ force: true });
    }

    const typeOption = this.page.getByText(leaveType, { exact: true }).first();
    if (await typeOption.count()) {
      await typeOption.click({ force: true });
    }

    await this.searchButton.click();
  }

  async isLoaded() {
    await this.applyLeaveHeading.waitFor({ state: 'visible' });
    return this.applyLeaveHeading.isVisible();
  }
}
