import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiFilter, TimeNote } from '@time-tracker/shared';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiService } from '../../shared/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class DashbordService {
  constructor(private http: HttpClient, private api: ApiService) {}

  timeNotes(dateFilters:ApiFilter[], searchFilters:ApiFilter[]): Observable<TimeNote[]> {
    
    let filters = null;
    
    if (dateFilters.length) {
      if (searchFilters.length) {
        filters =  [{ and: [...dateFilters, { or: searchFilters}] }];//works with basic filter
      } else {
        filters = dateFilters;
      }
    } else {
      return throwError(() => 'dateFilters not found');
    }


    return this.http.get<TimeNote[]>(this.api.getTimeNotesEndpoint(), {
      params: this.api.createParams(filters)
    }).pipe(
      catchError(({ error }) => {
        return throwError(() => error?.message ?? error);
      })
    );
  }
}
