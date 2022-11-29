import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable, take, switchMap, Subscription, of } from 'rxjs';
import * as fromDashboard from '../state/selectors';
import * as fromSettings from '../../../app/settings/state/selectors';
import * as DashboardActions from '../state/actions/dashboard-actions';
import {
  ApiFilter,
  LocalIssue,
  LocalTimeNote,
  TimeNote,
} from '@time-tracker/shared';
import { DatesService } from '../../shared/services/dates.service';
import { Columns } from '../../../../../../libs/src/lib/settings';
import {
  selectDefaultColumnsState,
  selectLoadingSettings,
} from '../../settings/state/selectors/index';
import { defaultColumns } from '../../settings/state/reducers/index';
import { FilterActions, ProfileActions } from '../../settings/state/actions';
import { selectLoadingProfile } from '../../settings/state/selectors/index';
import { DefaultView } from '@time-tracker/shared';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'time-tracker-nx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  loadingDashboard$: Observable<boolean | null>;
  view$: Observable<DefaultView>;
  timeNotes$: Observable<TimeNote[]>;
  loadingSettings$: Observable<boolean | null>;
  loadingProfile$: Observable<boolean | null>;
  issues$: Observable<LocalIssue[]>;
  daysRange$: Observable<string[]>;
  defaultColumns$: Observable<Columns>;
  showPaginator$: Observable<boolean>;
  calendar$: Observable<{ year: number; month: number }>;

  loadingProfileSub!: Subscription;

  defaultColumns = defaultColumns;
  defaultYear = new Date().getFullYear();
  defaultMonth = new Date().getMonth();

  filters: ApiFilter[] = [];

  constructor(private store: Store, private dateService: DatesService) {
    this.store.dispatch(ProfileActions.loadProfile());
    this.store.dispatch(FilterActions.loadFilters());
    this.store.dispatch(DashboardActions.removeSearchFilters());

    this.view$ = this.store
      .select(fromSettings.selectProfileState)
      .pipe(map((profile) => profile.defaultView));

    this.timeNotes$ = this.store.select(fromDashboard.selectTimeNotes);
    this.showPaginator$ = this.store.select(fromDashboard.selectShowPaginator);
    this.daysRange$ = this.store.select(fromDashboard.selectDaysRange);
    this.loadingDashboard$ = this.store.select(
      fromDashboard.selectTimeNotesLoading
    );
    this.loadingSettings$ = this.store.select(selectLoadingSettings);
    this.loadingProfile$ = this.store.select(selectLoadingProfile);

    this.issues$ = this.store.select(fromDashboard.selectTimeNotes).pipe(
      map((data) => {
        if (!data) {
          return [];
        }
        const uniqueIssueIds =
          [...new Set(data.map((note) => note.glIssueId))] || [];

        const result: LocalIssue[] = uniqueIssueIds
          .reduce((acc: LocalIssue[], glIssueId) => {
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
                id: note.issueId,
                glIssueId: note.glIssueId,
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
          }, [])
          .sort((a, b) => {
            const milestoneA = a.milestone ? a.milestone : '';
            const milestoneB = b.milestone ? b.milestone : '';

            return (
              a.glNamespace.localeCompare(b.glNamespace) ||
              a.glProject.localeCompare(b.glProject) ||
              milestoneA.localeCompare(milestoneB) ||
              a.title.localeCompare(b.title)
            );
          });
        return result;
      })
    );
    this.defaultColumns$ = this.store.select(selectDefaultColumnsState);
    this.calendar$ = this.store.select(fromDashboard.selectCalendar);
  }

  ngOnDestroy(): void {
    this.loadingProfileSub.unsubscribe();
  }

  ngOnInit(): void {
    this.loadingProfileSub = this.loadingProfile$
      .pipe(
        switchMap((loading) => {
          if (!loading) {
            return this.view$;
          }
          return of(null);
        })
      )
      .subscribe((data) => {
        if (data) {
          if (data === 'monthly') {
            this.calculateMonthFilters();
          } else if (data === 'weekly') {
            this.calculateCurrentWeekFilters();
          }

          this.store.dispatch(
            DashboardActions.setDateFilters({ filters: this.filters })
          );
          this.store.dispatch(DashboardActions.loadTimeNotes());
        }
      });
  }

  private calculateCurrentWeekFilters() {
    let today = new Date();

    let firstDay = new Date(
      today.setDate(today.getDate() - today.getDay() + 1)
    );
    let lastDay = new Date(today.setDate(today.getDate() - today.getDay() + 7));

    this.filters = this.dateService.getDaysFilters(firstDay, lastDay);
  }

  private calculateMonthFilters() {
    this.calendar$?.pipe(take(1)).subscribe((data) => {
      const dates = this.dateService.getDatesInMonth(data.year, data.month);

      const firstDay = dates[0].key;
      const lastDay = dates[dates.length - 1].key;

      this.filters = this.dateService.getDaysFilters(firstDay, lastDay);
    });
  }
}
