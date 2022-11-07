import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Instance } from '@time-tracker/shared';
import { Observable, of, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { InstancesActions } from '../../state/actions';
import { selectInstances } from '../../state/selectors/index';

@Component({
  selector: 'time-tracker-nx-credentials-page',
  templateUrl: './credentials-page.component.html',
  styleUrls: ['./credentials-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CredentialsPageComponent implements OnInit {
  instances$: Observable<Instance[]>;

  constructor(private store: Store) {
    this.instances$ = this.store.select(selectInstances);
  }

  ngOnInit(): void {
    this.store.dispatch(InstancesActions.loadInstances());
  }
}
