import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../../auth/actions';
import { PublicUser } from '../../../../../../../libs/src/lib/auth';
import { Observable } from 'rxjs';
import * as fromAuth from '../../../auth/reducers/index';
import { MenuItem } from '../../../../../../../libs/src/lib/sidenav';

@Component({
  selector: 'time-tracker-nx-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit {
  user$: Observable<PublicUser | null | undefined>;

  menuItems: MenuItem[] = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Profile', path: '/settings/profile' },
    { label: 'My filters ', path: '/settings/my-filters' },
    { label: 'Fill in Gitlab credentials', path: '/settings/credentials' },
  ];

  constructor(private router: Router, private store: Store) {
    this.user$ = this.store.select(fromAuth.selectLoggeduser);
  }

  ngOnInit(): void {}

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}
