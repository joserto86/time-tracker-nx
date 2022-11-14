import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import {
  LocalIssue,
  LocalTimeNote,
  PublicUser,
  TimeNote,
} from '@time-tracker/shared';
import { Observable } from 'rxjs';
import * as fromAuth from '../../auth/reducers';

@Component({
  selector: 'time-tracker-nx-tracker-detail-info',
  template: `
    <h2>Time notes Detail</h2>
    <h3>Empleado: {{ (this.user$ | async)?.username }}</h3>
    <mat-card>
      <table mat-table [dataSource]="dataSource">
        <ng-container matColumnDef="namespace">
          <th mat-header-cell *matHeaderCellDef>Namespace</th>
          <td mat-cell *matCellDef="let issue">{{ issue.glNamespace }}</td>
        </ng-container>

        <ng-container matColumnDef="project">
          <th mat-header-cell *matHeaderCellDef>Project</th>
          <td mat-cell *matCellDef="let issue">{{ issue.glProject }}</td>
        </ng-container>

        <ng-container matColumnDef="milestone">
          <th mat-header-cell *matHeaderCellDef>Milestone</th>
          <td mat-cell *matCellDef="let issue">{{ issue.milestone }}</td>
        </ng-container>

        <ng-container matColumnDef="issue">
          <th mat-header-cell *matHeaderCellDef>Issue</th>
          <td
            mat-cell
            *matCellDef="let issue"
            [matTooltip]="issue.glIssue"
            matTooltipPosition="left"
            matTooltipClass="issue-title-tooltip"
          >
            {{
              issue.glIssue.length > 25
                ? (issue.glIssue | slice: 0:25) + '...'
                : issue.glIssue
            }}
          </td>
        </ng-container>

        <ng-container matColumnDef="date">
          <th class="days" mat-header-cell *matHeaderCellDef>Date</th>
          <td class="days" mat-cell *matCellDef="let issue">
            {{ issue.spentAt | date: 'd/M/yy' }}
          </td>
        </ng-container>

        <ng-container matColumnDef="hours">
          <th class="days" mat-header-cell *matHeaderCellDef>Hours</th>
          <td class="days" mat-cell *matCellDef="let issue">
            {{ issue.computed / 3600 | number: '1.2-2' }}
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns"></tr>
      </table>

      <mat-paginator
        #paginator
        [length]="tableData.length"
        [pageSize]="5"
      ></mat-paginator>
    </mat-card>

    <mat-dialog-actions>
      <button mat-raised-button (click)="close()">Close</button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      table {
        width: 100%;
        margin-bottom: 2rem;

        .days {
          text-align: center;
        }

        td {
          min-width: 65px;
        }
      }

      .mat-header-cell {
        background-color: #fff;
        color: #5a5a5a;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackerDetailInfoComponent implements OnInit {
  @ViewChild('paginator') paginator: MatPaginator | null = null;

  displayedColumns: string[] = ['date', 'hours'];
  tableData: TimeNote[] = [];
  user$: Observable<PublicUser | null | undefined>;
  dataSource: MatTableDataSource<TimeNote> = new MatTableDataSource();

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public dataDialog: { issues: LocalIssue[]; defaultColumns: string[] },
    private dialogRef: MatDialogRef<TrackerDetailInfoComponent>,
    private store: Store
  ) {
    this.user$ = this.store.select(fromAuth.selectLoggeduser);
    this.tableData = this.dataDialog.issues.reduce(
      (tData: TimeNote[], x: LocalIssue) => {
        const result = x.timeNotes.reduce(
          (acc: TimeNote[], y: LocalTimeNote) => {
            let timeNote: TimeNote = {
              id: y.id,
              author: y.author,
              body: y.body,
              computed: y.computed,
              createdAt: y.createdAt,
              glId: y.glId,
              glInstance: x.glInstance,
              glIssue: x.title,
              glIssueId: x.id,
              glIssueIid: x.glIssueIid,
              glNamespace: x.glNamespace,
              glProject: x.glProject,
              glProjectId: x.glProjectId,
              secondsAdded: y.secondsAdded,
              secondsRemoved: y.secondsRemoved,
              secondsSubtracted: y.secondsSubstracted,
              spentAt: y.spentAt,
              updatedAt: y.updatedAt,
              milestone: x.milestone,
            };

            return [...acc, timeNote];
          },
          []
        );
        return [...tData, ...result];
      },
      []
    );

    this.displayedColumns = [
      ...this.dataDialog.defaultColumns,
      ...this.displayedColumns,
    ];
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.tableData);
    this.dataSource.paginator = this.paginator;
  }

  close() {
    this.dialogRef.close();
  }
}
