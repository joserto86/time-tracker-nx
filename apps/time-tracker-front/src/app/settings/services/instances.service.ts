import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Instance } from '@time-tracker/shared';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiService } from '../../core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class InstancesService {
  constructor(private http: HttpClient, private api: ApiService) {}

  getInstances(): Observable<Instance[]> {
    return this.http.get<Instance[]>(this.api.getInstancesEndpoint()).pipe(
      catchError(({ error }) => {
        return throwError(() => error?.message ?? error);
      })
    );
  }
}
