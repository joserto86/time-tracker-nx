import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly base = environment.apiEndpoint;

  getLoginEndpoint(): string {
    return `${this.base}/login`;
  }

  getRefreshTokenEndpoint(): string {
    return `${this.base}/token/refresh`;
  }

  getInstancesEndpoint(): string {
    return `${this.base}/instance`;
  }

  getTokenInstanceEndpoint(id: number): string {
    return `${this.base}/instance/${id}`;
  }

  getTimeNotesEndpoint(): string {
    return `${this.base}/user/time-note`
  }

  getFiltersEndpoint(): string {
    return `${this.base}/user/filters`
  }

  getProfileEndpoint(): string {
    return `${this.base}/user/profile`
  }
  
  needsAuthToken(request: HttpRequest<unknown>): boolean {
    if (
      request.method === 'POST' &&
      (request.url.indexOf(this.getLoginEndpoint()) >= 0 ||
        request.url.indexOf(this.getRefreshTokenEndpoint()) >= 0)
      /*(request.method === 'GET' &&
        // request.url.indexOf(this._getSAPCheckUUIDBaseEndpoint()) >= 0 &&
        request.url.match(/secret$/))*/
    ) {
      return false;
    }
    return true;
  }

  createParams(filters: unknown) {
    const params : { page?: string, limit?: string, where?: string } = {};
    params.where = JSON.stringify(filters);

    return params;
  }
}
