import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioDto } from '../../dto/userDto';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

  private urlCrear ="http://localhost:8080/api/people/create";
  constructor(private httpCliente: HttpClient){

  }
  crearUsuario(userDto: UsuarioDto){
    return this.httpCliente.post(`${this.urlCrear}`, userDto)
  }

}
