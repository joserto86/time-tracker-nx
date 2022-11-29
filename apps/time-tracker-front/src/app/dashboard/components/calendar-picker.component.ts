import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { Store } from '@ngrx/store';
import { DatesService } from '../../shared/services/dates.service';
import { CalendarPickerDateApapter } from '../services/calendar-picker-date-adapter';
import * as DashboardActions from '../state/actions/dashboard-actions';
import { OnInit } from '@angular/core';

const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY',
  },
};

@Component({
  selector: 'time-tracker-nx-calendar-picker',
  template: `
    <ng-container>
      <mat-form-field appearance="fill">
        <mat-label>Month and Year</mat-label>
        <input
          matInput
          placeholder="Month and year"
          [max]="today"
          [matDatepicker]="dp"
          [formControl]="date"
        />
        <mat-datepicker-toggle matIconSuffix [for]="dp"></mat-datepicker-toggle>
        <mat-datepicker
          #dp
          disabled="false"
          startView="multi-year"
          (monthSelected)="setMonthAndYear($event, dp)"
        >
        </mat-datepicker>
      </mat-form-field>
    </ng-container>
  `,
  styles: [],
  providers: [
    {
      provide: DateAdapter,
      useClass: CalendarPickerDateApapter,
      deps: [MAT_DATE_LOCALE],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarPickerComponent implements OnInit{
  @ViewChild('picker') datePicker!: MatDatepicker<Date>;
  @Input() year!: number;
  @Input() month!: number;

  today = new Date();
  initialDate!: Date;
  date!: FormControl<Date | null>;

  constructor(private store: Store, private dateService: DatesService) {

  }

  ngOnInit(): void {
    this.initialDate = new Date(this.year, this.month);
    this.date = new FormControl(this.initialDate);
  }

  setMonthAndYear(date: Date, datepicker: MatDatepicker<Date>) {
    this.date.setValue(date);

    const year: number = date.getFullYear();
    const month: number = date.getMonth();

    this.store.dispatch(DashboardActions.setCalendar({ year, month }));

    this.reloadDashboardFilters(year, month);
    datepicker.close();
  }

  reloadDashboardFilters(year: number, month: number) {
    const dates = this.dateService.getDatesInMonth(year, month);
    const firstDay = dates[0].key;
    const lastDay = dates[dates.length - 1].key;
    const filters = this.dateService.getDaysFilters(firstDay, lastDay);
    this.store.dispatch(DashboardActions.setDateFilters({ filters }));
    this.store.dispatch(DashboardActions.loadTimeNotes());
  }
}
