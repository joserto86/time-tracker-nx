import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiFilter, TimeNote } from '@time-tracker/shared';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiService } from '../../shared/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class DashbordService {
  constructor(private http: HttpClient, private api: ApiService) {}

  timeNotes(filters: ApiFilter[]): Observable<TimeNote[]> {
    
    return this.http.get<TimeNote[]>(this.api.getTimeNotesEndpoint(), {
      params: this.createParams(filters)
    }).pipe(
      catchError(({ error }) => {
        return throwError(() => error?.message ?? error);
      })
    );
  }

  createParams(filters: ApiFilter[]) {
    const params : { page?: string, limit?: string, where?: string } = {};

    if(filters.length > 0) {
      params.where = JSON.stringify(filters);
    }

    return params;
  }
}
