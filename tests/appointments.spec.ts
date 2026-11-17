import { test, expect } from '../fixtures/test';
test.beforeEach(async ({ loginPage }) => {
  await loginPage.open();
});
test.afterEach(async ({ context }) => {
  await context.clearCookies();
});

test('Użytkownik może się zalogować @ui @smoke', async ({ loginPage, testData }) => {
  const { user } = testData;
  await loginPage.login(user.email, user.password);
  await expect(loginPage.userName).toHaveText(user.name);
});

test('Zalogowany użytkownik może zarezerwować wizytę @ui', async ({ loginPage, bookingPage, testData }) => {
  const { user, appointment } = testData;
  await loginPage.login(user.email, user.password);
  await expect(loginPage.userName).toHaveText(user.name);
  await bookingPage.open();
  await bookingPage.book(appointment.doctor, appointment.date, appointment.time);
  await expect(bookingPage.confirmation).toHaveText('Wizyta zarezerwowana');
  await expect(bookingPage.bookedDoctor).toHaveText(appointment.doctor);
  await expect(bookingPage.bookedDate).toHaveText(appointment.date);
  await expect(bookingPage.bookedTime).toHaveText(appointment.time);
});
