import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioService } from '../../services/Usuario/usuario-service';
import { UsuarioDto } from '../../dto/userDto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mostrar-usuarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mostrar-usuario.html',
  styleUrls: ['./mostrar-usuario.css'],
})
export class MostrarUsuarios implements OnInit {
  usuarios: UsuarioDto[] = [];
  loading = false;
  errorMessage = '';

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.loading = true;
    this.errorMessage = '';
    this.usuarioService.listarUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'No se pudieron cargar los usuarios.';
      },
    });
  }

  volver() {
    this.router.navigate(['/home']);
  }
}
