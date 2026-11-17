import type { Page, Locator } from '@playwright/test';

export class LoginPage {
  emailInput: Locator;
  passwordInput: Locator;
  loginButton: Locator;
  userName: Locator;

  constructor(private page: Page) {
    this.emailInput = page.locator('[data-testid="email"]');
    this.passwordInput = page.locator('[data-testid="password"]');
    this.loginButton = page.locator('[data-testid="login-button"]');
    this.userName = page.locator('[data-testid="user-name"]');
  }

  async open() {
    await this.page.goto('/login');
  }

  async login(email: string, password: string) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}
