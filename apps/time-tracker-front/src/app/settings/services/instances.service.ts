import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Instance } from '@time-tracker/shared';
import { catchError, Observable, throwError } from 'rxjs';
import { ApiService } from '../../core/services/api.service';
import { saveInstanceToken } from '../state/actions/instances.actions';
import { InstanceToken } from '../../../../../../libs/src/lib/settings';

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
  saveInstanceToken(instanceToken: InstanceToken) {
    const { token } = instanceToken;
    return this.http
      .post<InstanceToken>(
        this.api.getTokenInstanceEndpoint(instanceToken.id),
        { token }
      )
      .pipe(
        catchError(({ error }) => {
          return throwError(() => error?.message ?? error);
        })
      );
  }
}
