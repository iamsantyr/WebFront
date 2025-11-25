import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioDto } from '../../dto/userDto';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private readonly baseUrl = 'http://10.43.102.198:8080/api/people';

  constructor(private http: HttpClient) {}

  crearUsuario(userDto: UsuarioDto): Observable<UsuarioDto> {
    return this.http.post<UsuarioDto>(`${this.baseUrl}/create`, userDto);
  }

  listarUsuarios(): Observable<UsuarioDto[]> {
    return this.http.get<UsuarioDto[]>(`${this.baseUrl}/list`);
  }

  obtenerUsuario(id: number): Observable<UsuarioDto> {
    return this.http.get<UsuarioDto>(`${this.baseUrl}/get/${id}`);
  }
  obtenerUsuarioEmail(email: string): Observable<UsuarioDto> {
    return this.http.get<UsuarioDto>(`${this.baseUrl}/getEmail/${email}`);
  }

  actualizarUsuario(id: number, userDto: UsuarioDto): Observable<UsuarioDto> {
    return this.http.put<UsuarioDto>(`${this.baseUrl}/update/${id}`, userDto);
  }

  eliminarUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}
