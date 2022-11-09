import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAuth from '../../../auth/reducers/index';
import { Observable } from 'rxjs';
import { Profile, PublicUser } from '@time-tracker/shared';
import { selectProfileState } from '../../state/selectors';

@Component({
  selector: 'time-tracker-nx-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfilePageComponent implements OnInit {
  user$: Observable<PublicUser | null | undefined>;
  profile$: Observable<Profile | null | undefined>;

  constructor(private store: Store) {
    this.user$ = this.store.select(fromAuth.selectLoggeduser);
    this.profile$ = this.store.select(selectProfileState);
  }

  ngOnInit(): void {}
}
