import type { Page, Locator } from '@playwright/test';

export class BookingPage {
  doctorSelect: Locator;
  dateInput: Locator;
  timeSelect: Locator;
  bookButton: Locator;
  confirmation: Locator;
  bookedDoctor: Locator;
  bookedDate: Locator;
  bookedTime: Locator;

  constructor(private page: Page) {
    this.doctorSelect = page.locator('[data-testid="doctor"]');
    this.dateInput = page.locator('[data-testid="date"]');
    this.timeSelect = page.locator('[data-testid="time"]');
    this.bookButton = page.locator('[data-testid="book-button"]');
    this.confirmation = page.locator('[data-testid="booking-confirmation"]');
    this.bookedDoctor = page.locator('[data-testid="booked-doctor"]');
    this.bookedDate = page.locator('[data-testid="booked-date"]');
    this.bookedTime = page.locator('[data-testid="booked-time"]');
  }

  async open() {
    await this.page.goto('/appointments/new');
  }

  async book(doctor: string, date: string, time: string) {
    await this.doctorSelect.selectOption({ label: doctor });
    await this.dateInput.fill(date);
    await this.timeSelect.selectOption({ label: time });
    await this.bookButton.click();
  }
}
