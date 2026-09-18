import { expect, Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput;
  readonly passwordInput;
  readonly loginButton;
  readonly errorAlert;
  readonly usernameRequired;
  readonly passwordRequired;
  readonly url = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.errorAlert = page.getByRole('alert');
    this.usernameRequired = page.locator('.oxd-input-field-error-message').nth(0);
    this.passwordRequired = page.locator('.oxd-input-field-error-message').nth(1);
  }

  async goto() {
    await this.page.goto(this.url, { waitUntil: 'domcontentloaded' });
    await expect(this.usernameInput).toBeVisible({ timeout: 15000 });
    await expect(this.passwordInput).toBeVisible({ timeout: 15000 });
  }

  async login(username: string, password: string) {
    await expect(this.usernameInput).toBeVisible({ timeout: 15000 });
    await expect(this.passwordInput).toBeVisible({ timeout: 15000 });
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async submit() {
    await this.loginButton.click();
  }

  async getErrorMessage() {
    return this.errorAlert.textContent();
  }

  async getUsernameRequiredText() {
    return this.usernameRequired.textContent();
  }

  async getPasswordRequiredText() {
    return this.passwordRequired.textContent();
  }

  async getPasswordInputType() {
    return this.passwordInput.getAttribute('type');
  }
}
