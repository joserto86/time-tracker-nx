import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

export interface Dates {
  key: string;
  date: number;
  monthClass: string;
  todayClass?: string;
}

@Component({
  selector: 'time-tracker-nx-calendar-grid',
  template: `
    <h2 class="year">{{ year }}</h2>
    <div class="calendar">
      <article *ngFor="let day of daysOfWeek" class="cell">{{ day }}</article>

      <article *ngFor="let date of dates" class="cell">{{ date.date }}</article>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarGridComponent implements OnInit {
  month: number = 0; // 0 indexed
  year: number = 2022;

  dates: Dates[] = [];

  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wendsday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  constructor() {
    this.datesForGrid(2022, 0);
  }

  ngOnInit(): void {}

  datesForGrid(year: number, month: number) {
    const dates = [];
    const firstDay = new Date(year, month).getDay();
    const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
    const totalDaysInPrevMonth = new Date(year, month, 0).getDate();

    // Days from prev month to show in the grid
    for (let i = 1; i <= firstDay; i++) {
      let prevMonthDate = totalDaysInPrevMonth - firstDay + i;
      let key = new Date(year, month - 1, prevMonthDate).toLocaleString();
      this.dates.push({ key, date: prevMonthDate, monthClass: 'prev' });
    }

    // Days of the current month to show in the grid
    const today = new Date();
    for (var i = 1; i <= totalDaysInMonth; i++) {
      let key = new Date(year, month, i).toLocaleString();
      if (
        i === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear()
      ) {
        this.dates.push({
          key: key,
          date: i,
          monthClass: 'current',
          todayClass: 'today',
        });
      } else {
        dates.push({ key: key, date: i, monthClass: 'current' });
      }
    }

    const gridsize = 42;
    // If there is space left over in the grid, then show the dates for the next month
    if (dates.length < gridsize) {
      let count = gridsize - dates.length;
      for (let i = 1; i <= count; i++) {
        let key = new Date(year, month + 1, i).toLocaleString();
        this.dates.push({ key: key, date: i, monthClass: 'next' });
      }
    }
  }
}
