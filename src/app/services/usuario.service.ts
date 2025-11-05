// src/app/gestion-de-usuarios/services/usuario.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type EstadoUsuario = 'activo' | 'inactivo';

export interface UsuarioDto {
  id: number;
  nombre: string;
  correo: string;
  rol: string;
  estado: EstadoUsuario;
}

export interface UsuarioCreateDto {
  nombre: string;
  correo: string;
  rol: string;
  estado: EstadoUsuario;
}

export interface UsuarioUpdateDto {
  nombre?: string;
  correo?: string;
  rol?: string;
  estado?: EstadoUsuario;
}

@Injectable({ providedIn: 'root' })
export class UsuarioService {
  // Ajusta según tu backend
  private readonly baseUrl = '/api/usuarios';

  constructor(private http: HttpClient) {}

  listar(): Observable<UsuarioDto[]> {
    return this.http.get<UsuarioDto[]>(this.baseUrl);
  }

  obtener(id: number): Observable<UsuarioDto> {
    return this.http.get<UsuarioDto>(`${this.baseUrl}/${id}`);
  }

  crear(dto: UsuarioCreateDto): Observable<UsuarioDto> {
    return this.http.post<UsuarioDto>(this.baseUrl, dto);
  }

  editar(id: number, dto: UsuarioUpdateDto): Observable<UsuarioDto> {
    return this.http.put<UsuarioDto>(`${this.baseUrl}/${id}`, dto);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
