import { test, expect } from '../fixtures/test';

test('API: zalogowany użytkownik może utworzyć rezerwację @api', async ({ request, testData }) => {
  const { user, appointment } = testData;
  const loginResponse = await request.post('/login', {
    form: { email: user.email, password: user.password }
  });
  expect(loginResponse.status()).toBe(303);
  const response = await request.post('/api/appointments', {
    data: appointment,
  });
  expect(response.status()).toBe(201);
  const booking = await response.json();
  expect(booking.id).toEqual(expect.any(String));
  expect(booking.id).not.toBe('');
  expect(booking.doctor).toBe(appointment.doctor);
  expect(booking.date).toBe(appointment.date);
  expect(booking.time).toBe(appointment.time);
});
