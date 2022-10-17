import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtCredentials, JwtResponse } from '@time-tracker/shared';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { ApiService } from '../../core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private api: ApiService) {}

  login({ username, password, code }: JwtCredentials): Observable<JwtResponse> {
    password = password + code;
    return this.http
      .post<JwtResponse>(this.api.getLoginEndpoint(), {
        _username: username,
        _password: password,
      })
      .pipe(
        catchError(({ error }) => {
          return throwError(() => error?.code ?? error);
        })
      );
  }

  refresh(refreshToken: string): Observable<JwtResponse> {
    return this.http
      .post<JwtResponse>(this.api.getRefreshTokenEndpoint(), {
        refreshToken,
      })
      .pipe(
        catchError(({ error }) => {
          return throwError(() => error?.code ?? error);
        })
      );
  }

  logout() {
    return this.http.delete<JwtResponse>(this.api.getLoginEndpoint()).pipe(
      catchError(({ error }) => {
        return throwError(() => error?.code ?? error);
      })
    );
  }
}
