import { Component, OnInit } from '@angular/core';
import { UsuarioDto } from '../../dto/userDto';
import { Router } from '@angular/router';
import { UsuarioService } from '../../services/Usuario/usuario-service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registro-usuario',
  imports: [FormsModule],
  templateUrl: './registro-usuario.html',
  styleUrl: './registro-usuario.css',
})
export class RegistroUsuario implements OnInit{

usuarioDto: UsuarioDto= new UsuarioDto();

constructor(
  private usuarioService: UsuarioService,
  private router: Router

){}
ngOnInit(): void {
  
}
onRegistrarPersona(){
  this.crearUser();
}
crearUser(){
  this.usuarioService.crearUsuario(this.usuarioDto)
  .subscribe(data=>{
    console.log(data);
  })
}

}
