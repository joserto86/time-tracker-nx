import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Columns, LocalIssue } from '@time-tracker/shared';
import { DatesService } from '../../../shared/services/dates.service';
import { TrackerDetailInfoComponent } from '../tracker-detail-info.component';

type ColumnDef = { def: string; show: boolean };
@Component({
  selector: 'time-tracker-nx-issue-table',
  templateUrl: './issue-table.component.html',
  styleUrls: ['./issue-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IssueTableComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() issues!: LocalIssue[];
  @Input() daysRange!: string[];
  @Input() defaultColumns!: Columns;

  @Output() updatePage = new EventEmitter();

  @ViewChild('dashboardSort') dashboardSort = new MatSort();

  defaultColumnsDefinition: ColumnDef[] = [];
  displayedColumns: string[] = [];
  dataSource!: MatTableDataSource<LocalIssue>;

  constructor(private dialog: MatDialog, private datesService: DatesService) {}

  ngOnInit(): void {
    this.generateDisplayedColumns();
    this.dataSource = new MatTableDataSource(this.issues);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.dashboardSort;

    this.dataSource.sortingDataAccessor = (
      data: LocalIssue,
      header: string
    ) => {

      if (header === 'namespace') {
        return data.glNamespace;
      }

      if (header === 'project') {
        return data.glProject;
      }

      if (header === 'milestone') {
        return data.milestone || '' ;
      }

      if (header === 'issue') {
        return data.title;
      }

      return data[header as keyof LocalIssue] as string;
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.generateDisplayedColumns();
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
      ...this.daysRange,
      'total',
    ];
  }

  getDayHours(issue: LocalIssue, day: string) {
    let dayString = this.datesService.getDayFilterString(new Date(day));
    let dayNotes = issue.timeNotes.filter((x) => x.spentAt.includes(dayString));

    let totalSeconds: number = dayNotes.reduce((acc, x) => {
      let sum = +acc + x.computed;
      return sum;
    }, 0);

    if (totalSeconds === 0) {
      return null;
    }

    return totalSeconds / 3600;
  }

  getTotalIssue(issue: LocalIssue) {
    let result: number = issue.timeNotes.reduce((acc, x) => {
      let sum = acc + x.computed;
      return sum;
    }, 0);

    return result / 3600;
  }

  getTotalDayHours(day: string) {
    let dayString = this.datesService.getDayFilterString(new Date(day));

    let result = this.issues.reduce((acc, issue: LocalIssue) => {
      let sum = issue.timeNotes
        .filter((y) => y.spentAt.includes(dayString))
        .reduce((i, z) => {
          let s = i + z.computed;
          return s;
        }, 0);

      let r = sum + acc;
      return r;
    }, 0);

    if (result === 0) {
      return null;
    }

    return result / 3600;
  }

  getTotals() {
    let result = this.issues.reduce((acc, issue: LocalIssue) => {
      let sum = issue.timeNotes.reduce((i, z) => {
        let s = i + z.computed;
        return s;
      }, 0);

      let r = sum + acc;
      return r;
    }, 0);

    return result / 3600;
  }

  openDialog(issue: LocalIssue | null, day: string | null) {
    const dialogConfig = new MatDialogConfig();
    let dataDialog: { issues: LocalIssue[]; defaultColumns: string[] } = {
      issues: [],
      defaultColumns: [
        ...this.defaultColumnsDefinition
          .filter((col: ColumnDef) => col.show)
          .map((c: ColumnDef) => c.def),
      ],
    };

    if (issue && day) {
      dataDialog.issues.push({
        ...issue,
        timeNotes: issue.timeNotes.filter((y) => y.spentAt.includes(day)),
      });
    } else if (issue && !day) {
      dataDialog.issues.push(issue);
    } else if (!issue && day) {
      dataDialog.issues = this.issues.reduce((acc: LocalIssue[], x) => {
        let timenotes = x.timeNotes.filter((y) => y.spentAt.includes(day));
        if (timenotes.length > 0) {
          return [...acc, { ...x, timeNotes: timenotes }];
        }
        return acc;
      }, []);
    } else {
      dataDialog.issues = this.issues;
    }

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '1000px';
    dialogConfig.data = dataDialog;

    this.dialog.open(TrackerDetailInfoComponent, dialogConfig);
  }
}
