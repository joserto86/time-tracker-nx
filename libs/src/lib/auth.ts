export interface JwtCredentials {
    username: string;
    password: string;
    code: string;
  }
  
  export interface JwtRefresh {
    refreshToken: string;
  }
  
  export interface JwtResponse {
    token: string;
    refreshToken: string;
  }
  
//   export interface JwtRefreshToken {
//     uuid: string;
//     jwtToken: string;
//     expirationDate: number;
//   }