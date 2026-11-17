import { randomUUID } from 'node:crypto';
export function generateTestData() {
  const id = randomUUID();
  const tomorrow = new Date();
  tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);

  return {
    user: {
      email: `tester-${id}@example.com`,
      password: `Test-${randomUUID()}!`,
      name: `Tester ${id}`,
    },
    appointment: {
      doctor: 'Jan Kowalski',
      date: tomorrow.toISOString().slice(0, 10),
      time: '10:00',
    },
  };
}

export type TestData = ReturnType<typeof generateTestData>;
