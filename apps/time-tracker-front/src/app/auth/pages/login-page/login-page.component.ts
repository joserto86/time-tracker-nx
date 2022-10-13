import { ChangeDetectionStrategy, Component } from '@angular/core';
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
  error$: Observable<string | null>;

  constructor(public store: Store) { 
    this.pending$ = this.store.select(fromAuth.selectLoginPagePending);
    this.error$ = this.store.select(fromAuth.selectLoginPageError);
  }

  onSubmit(credentials: JwtCredentials) {
    this.store.dispatch(LoginPageActions.login({ credentials }));
  }

}
