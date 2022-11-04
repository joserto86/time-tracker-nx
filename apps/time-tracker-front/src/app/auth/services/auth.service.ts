import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtCredentials, JwtResponse } from '@time-tracker/shared';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiService } from '../../shared/services/api.service';

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
          return throwError(() => error?.message ?? error);
        })
      );
  }

  refresh(refreshToken: string): Observable<JwtResponse> {
    return this.http
      .post<JwtResponse>(this.api.getRefreshTokenEndpoint(), {
        refresh_token: refreshToken,
      })
      .pipe(
        catchError(({ error }) => {
          console.log(error);
          return throwError(() => error?.message ?? error);
        })
      );
  }

  logout() {
    return this.http.delete<JwtResponse>(this.api.getLoginEndpoint()).pipe(
      catchError(({ error }) => {
        return throwError(() => error?.message ?? error);
      })
    );
  }
}
