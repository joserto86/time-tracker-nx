import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Filter, Profile } from '@time-tracker/shared';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiService } from '../../shared/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class SettingsSevice {
  constructor(private http: HttpClient, private api: ApiService) {}

  getFilters(): Observable<Filter[]> {
    return this.http.get<Filter[]>(this.api.getFiltersEndpoint()).pipe(
      catchError(({ error }) => {
        return throwError(() => error?.message ?? error);
      })
    );
  }

  saveFilters(filters: Filter[]) {
    return this.http
      .post<Filter[]>(this.api.getFiltersEndpoint(), filters)
      .pipe(
        catchError(({ error }) => {
          return throwError(() => error?.message ?? error);
        })
      );
  }

  getProfile(): Observable<Profile> {
    return this.http.get<Profile>(this.api.getProfileEndpoint()).pipe(
      catchError(({ error }) => {
        return throwError(() => error?.message ?? error);
      })
    );
  }

  saveProfile(filters: Profile) {
    return this.http
      .post<Profile>(this.api.getProfileEndpoint(), filters)
      .pipe(
        catchError(({ error }) => {
          return throwError(() => error?.message ?? error);
        })
      );
  }
}
