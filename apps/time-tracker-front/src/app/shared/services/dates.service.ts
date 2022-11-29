import { Injectable } from '@angular/core';
import { ApiFilter } from '@time-tracker/shared';


export interface Dates {
  key: Date;
  date: number;
  monthClass: string;
  todayClass?: string;
}


@Injectable({
  providedIn: 'root',
})
export class DatesService {
  getDayFilterString(dayDate: Date): string {
    return `${dayDate.getFullYear()}-${String(dayDate.getMonth() + 1).padStart(2,'0')}-${String(dayDate.getDate()).padStart(2, '0')}`
  }

  getDaysRange(firstDay: Date, lastDay: Date): string[] {
    let result: string[] = [];

    firstDay.setHours(0);
    lastDay.setHours(0);

    if (firstDay < lastDay) {
      for (
        let d = new Date(firstDay);
        d <= lastDay;
        d.setDate(d.getDate() + 1)
      ) {
        result.push(this.getDayFilterString(d));
      }
    }

    return result;
  }

  getDaysFilters(firstDay: Date, lastDay: Date): ApiFilter[] {
    const result: ApiFilter[] = [
      {
        field: 'spentAt',
        value: this.getDayFilterString(firstDay),
        method: '>=',
      },
      {
        field: 'spentAt',
        value: this.getDayFilterString(lastDay),
        method: '<=',
      },
    ];

    return result;
  }

  getDaysRangeFromFilters(filters: ApiFilter[]) {
    let firstDate = new Date(filters[0].value);
    let lastDate = new Date(filters[1].value);

    return this.getDaysRange(firstDate, lastDate);
  }

  getDatesInMonth(year: number, month: number): Dates[] {
    const dates: Dates[] = []
    const firstDay = new Date(year, month).getDay();
    const totalDaysInMonth = new Date(year, month + 1, 0).getDate();
    const totalDaysInPrevMonth = new Date(year, month, 0).getDate();

    // Days from prev month to show in the grid
    for (let i = 1; i <= firstDay; i++) {
      let prevMonthDate = totalDaysInPrevMonth - firstDay + i;
      let key = new Date(year, month - 1, prevMonthDate);
      dates.push({ key, date: prevMonthDate, monthClass: 'prev' });
    }

    // Days of the current month to show in the grid
    const today = new Date();
    for (var i = 1; i <= totalDaysInMonth; i++) {
      let key = new Date(year, month, i);
      if (
        i === today.getDate() &&
        month === today.getMonth() &&
        year === today.getFullYear()
      ) {
        dates.push({
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
        let key = new Date(year, month + 1, i);
        dates.push({ key: key, date: i, monthClass: 'next' });
      }
    }

    return dates;
  }
}
