import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Filter } from '@time-tracker/shared';
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
}
