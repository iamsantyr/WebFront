import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDto } from '../../dto/loginDto';
import { Observable, tap } from 'rxjs';
import { UsuarioDto } from '../../dto/userDto';

export interface AuthResponse {
  token: string;
  user: UsuarioDto;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private urlServidor: string = 'http://localhost:8080/api';
  private urlLogin = this.urlServidor + '/auth/login';

  constructor(private httpClient: HttpClient) {
    console.log('Ruta de login! =', this.urlLogin);
  }

  loginSolv(loginDto: LoginDto): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(this.urlLogin, loginDto).pipe(
      tap((resp: AuthResponse) => {
        localStorage.setItem('auth_token', resp.token);
      })
    );
  }
}
