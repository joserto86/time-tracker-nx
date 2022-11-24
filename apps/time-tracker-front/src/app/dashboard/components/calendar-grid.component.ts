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
    <h2>{{ month | json }}  {{ month | date: 'MMMM' }} {{ year }}</h2>
    <!-- <pre>{{ dates | json }}</pre> -->
    <div class="calendar">
      <article class="calendar-head" *ngFor="let day of daysOfWeek">
        {{ day }}
      </article>
      <article *ngFor="let date of dates" class="cell">
        <span class="day-number">{{ date.date }}</span>
      </article>
    </div>
  `,
  styles: [
    `
      .calendar {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        margin-bottom: 2rem;
      }

      .cell {
        padding: 1rem;
        border: 1px solid lightgrey;
      }

      .calendar-head {
        background-color: #3f51b5;
        color: white;
        padding: 1rem;
        font-weight: 500;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarGridComponent implements OnInit {
  @Input() month: number = 0; // 0 indexed
  @Input() year: number = 2022;

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

  constructor() {}

  ngOnInit(): void {
    this.datesForGrid(this.year, this.month);

    console.log(this.dates);
  }

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
        this.dates.push({ key: key, date: i, monthClass: 'current' });
      }
    }

    const gridsize = 42;
    // If there is space left over in the grid, then show the dates for the next month
    if (this.dates.length < gridsize) {
      let count = gridsize - this.dates.length;
      for (let i = 1; i <= count; i++) {
        let key = new Date(year, month + 1, i).toLocaleString();
        this.dates.push({ key: key, date: i, monthClass: 'next' });
      }
    }
  }
}
