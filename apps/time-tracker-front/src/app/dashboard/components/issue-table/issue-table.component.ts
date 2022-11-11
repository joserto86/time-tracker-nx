import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ApiFilter, LocalIssue } from '@time-tracker/shared';
import { DatesService } from '../../../shared/services/dates.service';

@Component({
  selector: 'time-tracker-nx-issue-table',
  templateUrl: './issue-table.component.html',
  styleUrls: ['./issue-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IssueTableComponent implements OnInit {
  @Input() issues!: LocalIssue[];
  @Input() daysRange!: string[];

  @Output() updatePage = new EventEmitter();

  displayedColumns: string[] = [];

  constructor(
    private dialog: MatDialog,
    private store: Store,
    private datesService: DatesService
  ) {}

  ngOnInit(): void {
    this.displayedColumns = [
      'namespace',
      'project',
      'milestone',
      'issue',
      ...this.daysRange,
      'total',
    ];
  }

  emitUpdatePage(ev: any): void {
    let first = null;
    let last = null;
    if (ev.pageIndex === 0) {
      last = new Date(this.daysRange[0]);
      last.setDate(last.getDate() - 1);
      first = new Date(last);
      first.setDate(last.getDate() - 6);
    } else {
      first = new Date(this.daysRange[this.daysRange.length - 1]);
      first.setDate(first.getDate() + 1);
      last = new Date(first);
      last.setDate(first.getDate() + 6);
    }

    let filters = this.datesService.getDaysFilters(first, last);
    this.updatePage.emit(filters);
  }

  getDayHours(issue: LocalIssue, day: string) {
    let dayDate = new Date(day);
    let dayString = `${dayDate.getFullYear()}-${String(
      dayDate.getMonth() + 1
    ).padStart(2, '0')}-${String(dayDate.getDate()).padStart(2, '0')}`;

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
}
