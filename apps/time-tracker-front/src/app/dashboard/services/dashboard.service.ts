import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiService } from '../../core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class DashbordService {
  constructor(private http: HttpClient, private api: ApiService) {}

  instances(): Observable<unknown> {
    return this.http.get<unknown>(this.api.getInstancesEndpoint(), {}).pipe(
      catchError(({ error }) => {
        return throwError(() => error?.message ?? error);
      })
    );
  }
}
