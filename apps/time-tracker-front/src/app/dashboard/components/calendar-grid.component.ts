import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { DashboardActions } from '../state/actions';
import { Store } from '@ngrx/store';
import { DatesService } from '../../shared/services/dates.service';
import { TimeNote } from '../../../../../../libs/src/lib/dashboard';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TrackerDetailInfoComponent } from './tracker-detail-info.component';
import { ColumnDef } from './issue-table/issue-table.component';
import { Columns } from '../../../../../../libs/src/lib/settings';

export interface Dates {
  key: Date;
  date: number;
  monthClass: string;
  todayClass?: string;
}

@Component({
  selector: 'time-tracker-nx-calendar-grid',
  template: `
    <ng-container *ngIf="timeNotes.length; else loading">
      <h2>{{ date | date: 'MMMM' }} {{ year }}</h2>
      <div class="calendar">
        <article class="calendar-head" *ngFor="let day of daysOfWeek">
          {{ day }}
        </article>
        <article *ngFor="let date of dates" class="cell">
          <span
            class="day-number {{ date.monthClass }} {{ date.todayClass }}"
            >{{ date.date }}</span
          >

          <ng-container *ngIf="getTotalDayHours(date.key) as hours; else spacer">
            <div class="issue-info" (click)="openDialog(date.key)">
              <span class="bold"> {{ hours | number : '1.2-2' }} h </span>
              <mat-icon inline="true">info</mat-icon>
            </div>
          </ng-container>
          <ng-template #spacer>
            <span class="spacer"></span>
          </ng-template>

        </article>
      </div>
    </ng-container>
    <ng-template #loading> Loading ... </ng-template>
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
        display: flex;
        justify-content: space-between;
      }

      .calendar-head {
        background-color: #3f51b5;
        color: white;
        padding: 1rem;
        font-weight: 500;
      }

      .prev,
      .next {
        color: lightgrey;
      }

      .today {
        color: #3f51b5;
        font-weight: 500;
      }


      .issue-info {
        display: flex;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        text-align: center;

        mat-icon {
          display: inline-block;
          font-size: 1rem;
          margin-left: 5px;
        }
      }

      .spacer {
        flex-grow: 1;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarGridComponent implements OnInit, OnChanges {
  @Input() month: number = 0; // 0 indexed
  @Input() year: number = 2022;
  @Input() timeNotes: TimeNote[] = [];
  @Input() defaultColumns!: Columns;

  date = new Date(this.year, this.month);

  dates: Dates[] = [];

  displayedColumns: string[] = [];
  defaultColumnsDefinition: ColumnDef[] = [];

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
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  constructor(
    private dialog: MatDialog,
    private datesService: DatesService
  ) {}

  ngOnInit(): void {
    this.generateDisplayedColumns();
    this.dates = this.datesService.getDatesInMonth(this.year, this.month);
    this.date = new Date(this.year, this.month);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.generateDisplayedColumns();
  }

  getTotalDayHours(day: Date) {
    let dayString = this.datesService.getDayFilterString(day);

    let result = this.timeNotes
      .filter((timeNote) => timeNote.spentAt.includes(dayString))
      .reduce((acc, timeNote) => {
        return acc + timeNote.computed;
      }, 0);

    if (result === 0) {
      return null;
    }

    return result / 3600;
  }

  generateDisplayedColumns(): void {
    this.defaultColumnsDefinition = Object.keys(this.defaultColumns).map(
      (column) => {
        const definition: ColumnDef = {
          def: column,
          show: this.defaultColumns[column as keyof Columns],
        };
        return definition;
      }
    );

    this.displayedColumns = [
      ...this.defaultColumnsDefinition
        .filter((col: ColumnDef) => col.show)
        .map((c: ColumnDef) => c.def),
    ];
  }

  openDialog(day: Date) {
    const dialogConfig = new MatDialogConfig();
    let dataDialog: { timeNotes: TimeNote[]; defaultColumns: string[] } = {
      // issues: [],
      defaultColumns: [
        ...this.defaultColumnsDefinition
          .filter((col: ColumnDef) => col.show)
          .map((c: ColumnDef) => c.def),
      ],
      timeNotes: [],
      // defaultColumns: ['namespace', 'project', 'milestone', 'issue', 'labels'],
    };

    let dayString = this.datesService.getDayFilterString(day);

    dataDialog.timeNotes = this.timeNotes.filter((timeNote) =>
      timeNote.spentAt.includes(dayString)
    );

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '1000px';
    dialogConfig.data = dataDialog;

    this.dialog.open(TrackerDetailInfoComponent, dialogConfig);
  }
}
