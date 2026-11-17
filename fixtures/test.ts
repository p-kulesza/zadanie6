import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { BookingPage } from '../pages/BookingPage';
import { generateTestData, type TestData } from '../data/testData';
type Fixtures = {
  testData: TestData;
  loginPage: LoginPage;
  bookingPage: BookingPage;
};

export const test = base.extend<Fixtures>({
  testData: async ({ request }, use) => {
    const data = generateTestData();
    const headers: Record<string, string> = process.env.TEST_API_TOKEN
      ? { Authorization: `Bearer ${process.env.TEST_API_TOKEN}` }
      : {};
    const response = await request.post('/api/users', { data: data.user, headers });
    expect(response.status(), 'Utworzenie konta testowego').toBe(201);
    const createdUser = await response.json();
    expect(createdUser.id).toEqual(expect.any(String));
    expect(createdUser.id).not.toBe('');

    try {
      await use(data);
    } finally {
      const cleanup = await request.delete(`/api/users/${encodeURIComponent(createdUser.id)}`, { headers });
      expect(cleanup.status(), 'Usunięcie konta testowego').toBe(204);
    }
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  bookingPage: async ({ page }, use) => {
    await use(new BookingPage(page));
  },
});

export { expect };
