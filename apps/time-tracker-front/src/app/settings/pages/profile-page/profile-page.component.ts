import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAuth from '../../../auth/reducers/index';
import { Observable } from 'rxjs';
import { PublicUser } from '../../../../../../../libs/src/lib/auth';

@Component({
  selector: 'time-tracker-nx-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePageComponent implements OnInit {
  user$: Observable<PublicUser | null | undefined>;

  constructor(private store: Store) {
    this.user$ = this.store.select(fromAuth.selectLoggeduser);
  }

  ngOnInit(): void {}
}
