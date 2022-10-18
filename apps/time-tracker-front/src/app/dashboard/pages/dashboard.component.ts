import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromDashboard from '../reducers';
import * as DashboardActions from './../actions/dashboard-actions';

@Component({
  selector: 'time-tracker-nx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  loading$: Observable<boolean | null>;
  instances$: Observable<unknown | null>;

  constructor(public store: Store) {
    this.loading$ = this.store.select(fromDashboard.selectInstancesLoading);
    this.instances$ = this.store.select(fromDashboard.selectInstances);
  }

  ngOnInit(): void {
    this.store.dispatch(DashboardActions.loadInstances());
  }
}
