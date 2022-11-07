import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { TimeNote, LocalIssue } from '@time-tracker/shared';

@Component({
  selector: 'time-tracker-nx-issue-table',
  templateUrl: './issue-table.component.html',
  styleUrls: ['./issue-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IssueTableComponent implements OnInit {
  @Input() issues!: LocalIssue[];
  @Input() daysRange:string[] = [];

  displayedColumns: string[] = [];

  constructor(private dialog: MatDialog, private store: Store) {
    
  }

  ngOnInit(): void {
    this.displayedColumns = [
      'namespace',
      'name',
      'milestone',
      'issue',
      ...this.daysRange
    ];
    console.log(this.displayedColumns);
  }

}
