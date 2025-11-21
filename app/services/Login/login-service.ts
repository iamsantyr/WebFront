import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginDto } from '../../dto/loginDto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private urlServidor: string = "http://localhost:8080/api";
  private urlLogin = this.urlServidor+"/auth/login";
  constructor(private httpClient: HttpClient) {
    console.log('Ruta de login! =', this.urlLogin);
  }

  loginSolv(loginDto : LoginDto) : Observable<boolean>{
    return this.httpClient.post<boolean>(`${this.urlLogin}`, loginDto)
  }

}
