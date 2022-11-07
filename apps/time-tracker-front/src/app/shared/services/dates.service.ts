import { Injectable } from '@angular/core';
import { ApiFilter } from '@time-tracker/shared';

@Injectable({
  providedIn: 'root',
})
export class DatesService {
  getDaysRange(firstDay: Date, lastDay: Date): string[] {
    let result: string[] = [];

    if (firstDay < lastDay) {
      for (
        let d = new Date(firstDay);
        d <= lastDay;
        d.setDate(d.getDate() + 1)
      ) {
        result.push(`${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`);
      }
    }

    return result;
  }

  getDaysFilters(firstDay: Date, lastDay: Date): ApiFilter[] {
    const result: ApiFilter[] = [
      {
        field: 'spentAt',
        value: `${firstDay.getFullYear()}-${
          firstDay.getMonth() + 1
        }-${firstDay.getDate()}`,
        method: '>=',
      },
      {
        field: 'spentAt',
        value: `${lastDay.getFullYear()}-${
          lastDay.getMonth() + 1
        }-${lastDay.getDate()}`,
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
