import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { JwtCredentials } from '@time-tracker/shared';
import { Observable } from 'rxjs';
import { LoginPageActions } from '../../actions';
import * as fromAuth from '../../reducers';

@Component({
  selector: 'time-tracker-nx-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent {

  pending$: Observable<boolean | null>;

  constructor(public store: Store) { 
    this.pending$ = this.store.select(fromAuth.selectLoginPagePending);
  }

  onSubmit(credentials: JwtCredentials) {

    console.log('before dispatach');
    this.store.dispatch(LoginPageActions.login({ credentials }));
  }

}
