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
import { TrackerDetailInfoComponent } from '../tracker-detail-info.component';

@Component({
  selector: 'time-tracker-nx-issue-table',
  templateUrl: './issue-table.component.html',
  styleUrls: ['./issue-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IssueTableComponent implements OnInit {
  @Input() issues!: LocalIssue[];
  @Input() daysRange!:string[];

  @Output() updatePage = new EventEmitter();

  displayedColumns: string[] = [];

  constructor(private dialog: MatDialog, private store: Store, private datesService: DatesService) {
    
  }

  ngOnInit(): void {
    this.displayedColumns = [
      'namespace',
      'name',
      'milestone',
      'issue',
      ...this.daysRange,
      'total'
    ];
  }

  emitUpdatePage(ev:any):void {
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
    let dayString = this.datesService.getDayFilterString(new Date(day));
    let dayNotes = issue.timeNotes.filter(x => x.spentAt.includes(dayString));

    let totalSeconds:number = dayNotes.reduce((acc, x) => {
      let sum = +acc + x.computed;
      return sum;
    }, 0);

    if (totalSeconds === 0) {
      return null;
    }

    return totalSeconds / 3600;
  }

  getTotalIssue(issue: LocalIssue) {
    let result:number = issue.timeNotes.reduce((acc, x) => {
      let sum = acc + x.computed;
      return sum;
    }, 0);

    return result / 3600
  }

  getTotalDayHours(day: string) {
    let dayString = this.datesService.getDayFilterString(new Date(day));

    let result = this.issues.reduce((acc, issue: LocalIssue) => {
      let sum = issue.timeNotes.filter(y => y.spentAt.includes(dayString)).reduce((i, z) => {
        let s = i + z.computed;
        return s;
      },0);

      let r = sum + acc;
      return r;
    },0);

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
      },0);

      let r = sum + acc;
      return r;
    },0);

    return result / 3600;
  }

  openDialog(issue: LocalIssue | null, day: string | null) {
    const dialogConfig = new MatDialogConfig();
    let dataDialog:LocalIssue[] = [];

    if (issue && day) {
      dataDialog.push({
        ...issue,
        timeNotes: issue.timeNotes.filter(y => y.spentAt.includes(day))
      })

    } else if (issue && !day) {
      dataDialog.push(issue);

    } else if (!issue && day) {
      
      dataDialog = this.issues.reduce((acc:LocalIssue[], x) => {
        let timenotes = x.timeNotes.filter(y => y.spentAt.includes(day));
        if (timenotes.length > 0) {
          return [...acc, {...x, timeNotes: timenotes}];
        }
        return acc;
      }, [])
    }

    else {
      dataDialog = this.issues;
    }

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '1000px';
    dialogConfig.data = dataDialog;

    this.dialog.open(TrackerDetailInfoComponent, dialogConfig);
  }
}
