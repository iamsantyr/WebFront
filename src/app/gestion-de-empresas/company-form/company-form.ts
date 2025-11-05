import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from '../../services/company.service';

@Component({
  selector: 'app-company-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './company-form.html',
  styleUrls: ['./company-form.css'],
})
export class CompanyForm {
  form: FormGroup;
  loading = false;
  errorMessage = '';
  esEdicion = false;
  companyId?: number;

  constructor(
    private fb: FormBuilder,
    private companyService: CompanyService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      nit: ['', Validators.required],
      telefono: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.esEdicion = true;
        this.companyId = +params['id'];
        this.cargarEmpresa();
      }
    });
  }

  get f() {
    return this.form.controls;
  }

  cargarEmpresa(): void {
    if (!this.companyId) return;

    this.loading = true;
    this.companyService.obtener(this.companyId).subscribe({
      next: (data: any) => {
        this.form.patchValue({
          nombre: data?.nombre ?? '',
          nit: data?.nit ?? '',
          telefono: data?.telefono ?? '',
          email: data?.email ?? '',
        });
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'No se pudo cargar la empresa.';
        this.loading = false;
      }
    });
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    const dto = this.form.value;

    if (this.esEdicion && this.companyId) {
      this.companyService.actualizar(this.companyId, dto).subscribe({
        next: () => {
          this.loading = false;
          alert('Empresa actualizada correctamente');
          this.router.navigate(['/companies-list']);
        },
        error: () => {
          this.loading = false;
          this.errorMessage = 'No se pudo actualizar la empresa. Intenta nuevamente.';
        }
      });
    } else {
      this.companyService.crear(dto).subscribe({
        next: () => {
          this.loading = false;
          alert('Empresa creada correctamente');
          this.router.navigate(['/companies-list']);
        },
        error: () => {
          this.loading = false;
          this.errorMessage = 'No se pudo crear la empresa. Intenta nuevamente.';
        }
      });
    }
  }

  cancelar(): void {
    this.router.navigate(['/companies-list']);
  }
}
