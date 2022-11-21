import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { DatesService } from '../../shared/services/dates.service';
import { DashboardActions } from '../state/actions';

@Component({
  selector: 'time-tracker-nx-date-filter',
  template: `
    <mat-form-field appearance="fill" (click)="$event.stopPropagation()">
      <mat-label>Enter a date range</mat-label>
      <mat-date-range-input [formGroup]="range" [rangePicker]="picker" [max]="maxDate">
        <input matStartDate formControlName="start" placeholder="Start date" />
        <input matEndDate formControlName="end" placeholder="End date" />
      </mat-date-range-input>
      <mat-hint>DD/MM/YYYY – DD/MM/YYYY</mat-hint>
      <mat-datepicker-toggle
        matIconSuffix
        [for]="picker"
      ></mat-datepicker-toggle>
      <mat-date-range-picker #picker></mat-date-range-picker>

      <mat-error *ngIf="range.controls.start.hasError('matStartDateInvalid')"
        >Invalid start date</mat-error
      >
      <mat-error *ngIf="range.controls.end.hasError('matEndDateInvalid')"
        >Invalid end date</mat-error
      >
    </mat-form-field>
  `,
  styles: [`
    mat-form-field {
      margin: 10px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateFilterComponent implements OnInit {
  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  maxDate:Date;
  subscription!:Subscription

  constructor(private store: Store, private dateService: DatesService) {
    this.maxDate = new Date();
  }

  ngOnInit(): void {

    this.subscription = this.range.valueChanges.subscribe(range => {
      if (range.start && range.end) {
        const filters = this.dateService.getDaysFilters(range.start, range.end);
        this.store.dispatch(DashboardActions.removeDateFilters());
        this.store.dispatch(DashboardActions.setShowPaginator({showPaginator: false}));
        
        this.store.dispatch(DashboardActions.setDateFilters({filters}));
        this.store.dispatch(DashboardActions.loadTimeNotes())
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
