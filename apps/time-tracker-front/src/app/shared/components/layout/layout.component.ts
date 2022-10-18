import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../../auth/actions';
import { PublicUser } from '../../../../../../../libs/src/lib/auth';
import { Observable } from 'rxjs';
import * as fromAuth from '../../../auth/reducers/index';

@Component({
  selector: 'time-tracker-nx-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit {
  user$: Observable<PublicUser | null | undefined>;

  constructor(private router: Router, private store: Store) {
    this.user$ = this.store.select(fromAuth.selectLoggeduser);
  }

  ngOnInit(): void {}

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}
