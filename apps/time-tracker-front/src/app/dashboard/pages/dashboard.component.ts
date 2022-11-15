import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import * as fromDashboard from '../state/selectors';
import * as DashboardActions from '../state/actions/dashboard-actions';
import { ApiFilter, LocalIssue, LocalTimeNote } from '@time-tracker/shared';
import { DatesService } from '../../shared/services/dates.service';
import { Columns } from '../../../../../../libs/src/lib/settings';
import { selectDefaultColumnsState } from '../../settings/state/selectors/index';
import { defaultColumns } from '../../settings/state/reducers/index';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'time-tracker-nx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  loading$: Observable<boolean | null>;
  issues$: Observable<LocalIssue[]>;
  daysRange$: Observable<string[]>;
  defaultColumns$: Observable<Columns>;

  defaultColumns = defaultColumns;

  filters: ApiFilter[] = [];

  constructor(private store: Store, private dateService: DatesService) {
    this.calculateCurrentWeekFilters();
    this.daysRange$ = this.store.select(fromDashboard.selectDaysRange);
    this.loading$ = this.store.select(fromDashboard.selectTimeNotesLoading);
    this.issues$ = this.store.select(fromDashboard.selectTimeNotes).pipe(
      map((data) => {
        if (!data) {
          return [];
        }
        const uniqueIssueIds =
          [...new Set(data.map((note) => note.glIssueId))] || [];

        const result: LocalIssue[] = uniqueIssueIds.reduce(
          (acc: LocalIssue[], glIssueId) => {
            const note = data.find((note) => note.glIssueId === glIssueId);

            if (note) {
              const timeNotes: LocalTimeNote[] = data
                .filter((item) => item.glIssueId === glIssueId)
                .map((note) => ({
                  id: note.id,
                  body: note.body,
                  secondsAdded: note.secondsAdded,
                  secondsSubstracted: note.secondsSubtracted,
                  secondsRemoved: note.secondsRemoved,
                  createdAt: note.createdAt,
                  updatedAt: note.updatedAt,
                  spentAt: note.spentAt,
                  computed: note.computed,
                  author: note.author,
                  glId: note.glId,
                }));

              const newNote: LocalIssue = {
                id: note.glIssueId,
                glInstance: note.glInstance,
                glProjectId: note.glProjectId,
                glProject: note.project,
                glNamespace: note.namespace,
                milestone: note.milestone,
                title: note.issue,
                glIssueIid: note.glIssueIid,
                issueUrl: note.issueUrl,
                labels: note.labels,
                timeNotes,
              };

              return [...acc, newNote];
            } else {
              return [...acc];
            }
          },
          []
        );
        return result;
      })
    );
    this.defaultColumns$ = this.store.select(selectDefaultColumnsState);
  }

  ngOnInit(): void {
    this.store.dispatch(
      DashboardActions.setDateFilters({ filters: this.filters })
    );
    this.store.dispatch(DashboardActions.loadTimeNotes());
  }

  private calculateCurrentWeekFilters() {
    let today = new Date();

    let firstDay = new Date(
      today.setDate(today.getDate() - today.getDay() + 1)
    );
    let lastDay = new Date(today.setDate(today.getDate() - today.getDay() + 7));

    this.filters = this.dateService.getDaysFilters(firstDay, lastDay);
  }
}
