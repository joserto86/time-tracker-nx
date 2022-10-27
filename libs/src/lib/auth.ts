export interface JwtCredentials {
    username: string;
    password: string;
    code: string;
  }

  export interface JwtRefresh {
    refresh_token: string;
  }

  export interface JwtResponse {
    token: string;
    refresh_token: string;
  }

  export interface PublicUser {
    username: string;
    roles: string[];
    exp: number;
  }

//   export interface JwtRefreshToken {
//     uuid: string;
//     jwtToken: string;
//     expirationDate: number;
//   }
