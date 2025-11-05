import { Component, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';

interface Usuario {
  nombre: string;
  email: string;
  rol: string;
  empresa: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home {
  usuario: Usuario | null = null;

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.cargarUsuario();
  }

  cargarUsuario(): void {
    if (isPlatformBrowser(this.platformId)) {
      const userData = this.localStorageService.getItem('user');
      if (userData) {
        this.usuario = JSON.parse(userData);
      } else {
        this.usuario = {
          nombre: 'Usuario Demo',
          email: 'demo@empresa.com',
          rol: 'Administrador',
          empresa: 'Mi Empresa'
        };
      }
    }
  }

  crearEmpresa(): void {
    this.router.navigate(['/company-form']);
  }

  verEmpresas(): void {
    this.router.navigate(['/companies-list']);
  }

  cerrarSesion(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.localStorageService.removeItem('user');
    }
    this.router.navigate(['/login']);
  }
}
