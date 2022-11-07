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
      params: this.api.createParams(filters)
    }).pipe(
      catchError(({ error }) => {
        return throwError(() => error?.message ?? error);
      })
    );
  }
}
