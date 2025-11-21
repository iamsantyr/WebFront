import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmpresaDto } from '../dto/empresaDto';

export interface OrganizationDto {
  id?: number;
  name: string;
  descripcion?: string;
  nit?: string;
  direccion?: string;
  telefono?: string;
  email?: string;
}

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  private baseUrl = '/api/organizations';

  constructor(private http: HttpClient) {}

  listar(): Observable<EmpresaDto[]> {
    return this.http.get<EmpresaDto[]>(`${this.baseUrl}/list`);
  }

  obtener(id: number): Observable<EmpresaDto> {
    return this.http.get<EmpresaDto>(`${this.baseUrl}/get/${id}`);
  }

  crear(organization: EmpresaDto): Observable<EmpresaDto> {
    return this.http.post<EmpresaDto>(`${this.baseUrl}/create`, organization);
  }

  actualizar(id: number, organization: EmpresaDto): Observable<EmpresaDto> {
    return this.http.put<EmpresaDto>(`${this.baseUrl}/update/${id}`, organization);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }
}