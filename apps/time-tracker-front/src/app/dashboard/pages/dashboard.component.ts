import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, of, take } from 'rxjs';
import * as fromDashboard from '../state/selectors';
import * as DashboardActions from '../state/actions/dashboard-actions';
import { DashbordService } from '../services/dashboard.service';
import { ApiFilter, TimeNote } from '@time-tracker/shared';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'time-tracker-nx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  loading$: Observable<boolean | null>;
  timeNotes$: Observable<TimeNote[] | null | undefined>;

  filters: ApiFilter[] = [];

  constructor(public store: Store, public borrame: DashbordService) {
    this.loading$ = this.store.select(fromDashboard.selectTimeNotesLoading);
    this.timeNotes$ = this.store.select(fromDashboard.selectTimeNotes);

  }

  ngOnInit(): void {
    this.filters.push({
      field: 'spentAt',
      value: '2022-10-31 00:00:00',
      method: '>',
    })


    this.store.dispatch(DashboardActions.loadTimeNotes({filters: this.filters}));
  }
}
