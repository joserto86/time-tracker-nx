import { Injectable } from '@angular/core';
import { ApiFilter } from '@time-tracker/shared';

@Injectable({
  providedIn: 'root',
})
export class DatesService {
  getDayFilterString(dayDate: Date): string {
    return `${dayDate.getFullYear()}-${String(dayDate.getMonth() + 1).padStart(2,'0')}-${String(dayDate.getDate()).padStart(2, '0')}`
  }

  getDaysRange(firstDay: Date, lastDay: Date): string[] {
    let result: string[] = [];

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
}
