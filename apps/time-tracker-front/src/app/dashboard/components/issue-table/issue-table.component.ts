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
      ...this.daysRange
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

    console.log(first);
    console.log(last);

    let filters = this.datesService.getDaysFilters(first, last);
    this.updatePage.emit(filters);
  }

}
