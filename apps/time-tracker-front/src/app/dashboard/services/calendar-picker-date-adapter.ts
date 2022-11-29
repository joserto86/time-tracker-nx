import { NativeDateAdapter } from '@angular/material/core';
import { DatePipe } from '@angular/common';

export class CalendarPickerDateApapter extends NativeDateAdapter {
  constructor(private datePipe: DatePipe) {
    super('es');
  }

  override getFirstDayOfWeek(): number {
    return 1;
  }

  override format(date: Date, displayFormat: Object): string {
    const days = date.getDate();
    const months = date.getMonth() + 1;
    const year = date.getFullYear();

    if (displayFormat === 'MM/YYYY') {
      return `${String(months).padStart(2, '0')}/${year}`;
    }

    return days + '/' + months + '/' + year;
  }
}
