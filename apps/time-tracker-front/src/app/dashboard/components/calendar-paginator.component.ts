import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'time-tracker-nx-calendar-paginator',
  template: `
    <h2>{{ 0 | date: 'MMMM' }} {{ 2022 }}</h2>
    <p>
      calendar-paginator works!
    </p>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarPaginatorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
