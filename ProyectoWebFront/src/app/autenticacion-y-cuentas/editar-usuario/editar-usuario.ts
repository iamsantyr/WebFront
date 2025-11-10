import { Component, OnInit } from '@angular/core';
import { UsuarioDto } from '../../dto/userDto';
import { UsuarioService } from '../../services/Usuario/usuario-service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modificar-usuario',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './editar-usuario.html',
  styleUrls: ['./editar-usuario.css'],
})
export class EditarUsuario implements OnInit {
  usuarioDto: UsuarioDto = new UsuarioDto();

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarDatosUsuario();
  }

  cargarDatosUsuario() {
    this.usuarioService.obtenerUsuarioEmail(this.usuarioDto.email!).subscribe((data) => {
      this.usuarioDto = data;
    });
  }

  onModificarUsuario() {
    this.usuarioService.actualizarUsuario(this.usuarioDto.id!, this.usuarioDto).subscribe(
      (data) => {
        console.log('Usuario modificado correctamente:', data);
        alert('Cambios guardados con éxito.');
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Error al modificar usuario:', error);
        alert('No se pudo modificar el usuario. Intenta nuevamente.');
      }
    );
  }
}
