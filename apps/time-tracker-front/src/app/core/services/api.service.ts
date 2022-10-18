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
    return `${this.base}/login/refresh`;
  }

  needsAuthToken(request: HttpRequest<unknown>): boolean {
    if (
      (request.method === 'POST' &&
        request.url.indexOf(this.getLoginEndpoint()) >= 0) ||
      (request.method === 'GET' &&
        // request.url.indexOf(this._getSAPCheckUUIDBaseEndpoint()) >= 0 &&
        request.url.match(/secret$/))
    ) {
      return false;
    }
    return true;
  }
}
