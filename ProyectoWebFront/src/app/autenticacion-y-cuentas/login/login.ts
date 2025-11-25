import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LoginDto } from '../../dto/loginDto';
import { LoginService } from '../../services/Login/login-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login implements OnInit {
  errorMessage: string | null = null;
  loginDto: LoginDto = new LoginDto();

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    console.log('Correo:', this.loginDto.email);
    console.log('Contraseña:', this.loginDto.password);
    this.loginUser();
  }

  loginUser() {
    this.errorMessage = null;

    this.loginService.loginSolv(this.loginDto).subscribe({
      next: (resp) => {
        this.navegarHomeScreen();
      },
      error: (error) => {
        console.error('Error al iniciar sesión:', error);
        this.errorMessage = 'Las credenciales no coinciden, intenta de nuevo.';
      }
    });
  }

  navegarHomeScreen() {
    this.router.navigate(['/home']);
  }
}
