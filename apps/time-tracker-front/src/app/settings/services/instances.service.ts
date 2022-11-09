import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Instance } from '@time-tracker/shared';
import { catchError, Observable, throwError } from 'rxjs';;
import { InstanceToken } from '../../../../../../libs/src/lib/settings';
import { ApiService } from '../../shared/services/api.service';

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
    const { token, username } = instanceToken;

    let dataTosend: Partial<InstanceToken> = {};

    if (token) {
      dataTosend.token = token;
    }

    if (username) {
      dataTosend.username = username;
    }

    return this.http
      .put<InstanceToken>(
        this.api.getTokenInstanceEndpoint(instanceToken.id),
        dataTosend
      )
      .pipe(
        catchError(({ error }) => {
          return throwError(() => error?.message ?? error);
        })
      );
  }
}
