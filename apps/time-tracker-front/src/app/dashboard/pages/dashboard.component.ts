import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, take } from 'rxjs';
import * as fromDashboard from '../reducers';
import * as DashboardActions from './../actions/dashboard-actions';
import { DashbordService } from '../services/dashboard.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'time-tracker-nx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  loading$: Observable<boolean | null>;
  instances$: Observable<unknown | null>;


  data$ = this.borrame.instances().pipe(
    take(1)
  )
  constructor(public store: Store, public borrame: DashbordService) {
    this.loading$ = this.store.select(fromDashboard.selectInstancesLoading);
    this.instances$ = this.store.select(fromDashboard.selectInstances);
  }

  ngOnInit(): void {
    this.store.dispatch(DashboardActions.loadInstances());
  }
}
