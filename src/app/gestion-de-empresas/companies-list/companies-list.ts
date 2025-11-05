import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { PLATFORM_ID } from '@angular/core';
import { CompanyService, CompanyDto } from '../../services/company.service';

interface CompanyView {
  id: number;
  nombre: string;
  nit: string;
  telefono: string;
  email: string;
}

@Component({
  selector: 'app-companies-list',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './companies-list.html',
  styleUrls: ['./companies-list.css'],
})
export class CompaniesList {
  searchForm: FormGroup;
  mostrarFiltro = false;

  loading = false;
  errorMessage = '';

  modalOpen = false;
  empresaSeleccionada: CompanyView | null = null;

  empresas: CompanyView[] = [];
  todasLasEmpresas: CompanyView[] = [];

  private readonly isBrowser: boolean;

  constructor(
    private readonly fb: FormBuilder,
    private readonly companyService: CompanyService,
    private readonly router: Router,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);

    this.searchForm = this.fb.group({
      terminoBusqueda: [''],
      filtroEmail: ['']
    });

    this.cargarEmpresas();
  }

  private isCompanyArray(data: unknown): data is CompanyDto[] {
    return Array.isArray(data);
  }

  cargarEmpresas(): void {
    this.loading = true;
    this.errorMessage = '';

    this.companyService.listar().subscribe({
      next: (empresasBackend: unknown) => {
        try {
          if (!this.isCompanyArray(empresasBackend)) throw new Error('Datos inválidos');

          this.todasLasEmpresas = empresasBackend.map((e: CompanyDto, i: number): CompanyView => ({
            id: (e as any)?.id ?? i + 1,
            nombre: (e as any)?.nombre ?? 'Sin nombre',
            nit: (e as any)?.nit ?? '000000000-0',
            telefono: (e as any)?.telefono ?? '0000000000',
            email: (e as any)?.email ?? 'sin-correo@ejemplo.com'
          }));

          this.empresas = [...this.todasLasEmpresas];
        } catch (e) {
          console.error(e);
          this.errorMessage = 'Error al procesar los datos';
        } finally {
          this.loading = false;
        }
      },
      error: (e: unknown) => {
        console.error('Error al cargar empresas:', e);
        this.errorMessage = 'Error al cargar las empresas. Usando datos de ejemplo.';
        this.loading = false;

        this.todasLasEmpresas = [
          {
            id: 1,
            nombre: 'Empresa Demo',
            nit: '900123456-7',
            telefono: '3001234567',
            email: 'demo@empresa.com'
          }
        ];
        this.empresas = [...this.todasLasEmpresas];
      }
    });
  }

  toggleFiltro(): void {
    this.mostrarFiltro = !this.mostrarFiltro;
  }

  filtrarEmpresas(): CompanyView[] {
    const v = this.searchForm.value as {
      terminoBusqueda?: string;
      filtroEmail?: string;
    };

    const term = (v.terminoBusqueda || '').trim().toLowerCase();
    if (!this.todasLasEmpresas?.length) return [];

    return this.todasLasEmpresas.filter((e) => {
      const coincideTerm =
        term === '' ||
        (e.nombre && e.nombre.toLowerCase().includes(term)) ||
        (e.nit && e.nit.toLowerCase().includes(term));

      const coincideEmail = v.filtroEmail ? (e.email && e.email.toLowerCase().includes(v.filtroEmail.toLowerCase())) : true;

      return coincideTerm && coincideEmail;
    });
  }

  abrirModal(e: CompanyView): void {
    this.empresaSeleccionada = e;
    this.modalOpen = true;

    if (this.isBrowser) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => (document.querySelector('.modal') as HTMLElement | null)?.focus(), 50);
    }
  }

  cerrarModal(): void {
    this.modalOpen = false;
    this.empresaSeleccionada = null;
    if (this.isBrowser) document.body.style.overflow = '';
  }

  onKeyDown(event: Event, e?: CompanyView): void {
    const ev = event as KeyboardEvent;
    if (ev.key === 'Enter' && e) this.abrirModal(e);
    if (ev.key === 'Escape') this.modalOpen ? this.cerrarModal() : this.toggleFiltro();
  }

  irCrear(): void {
    this.router.navigate(['/company-form']);
  }

  volverHome(): void {
    this.router.navigate(['/home']);
  }

  editarEmpresa(e: CompanyView): void {
    this.router.navigate(['/company-form'], { queryParams: { id: e.id } });
  }

  editarSeleccionada(): void {
    if (!this.empresaSeleccionada) return;
    this.router.navigate(['/company-form'], { queryParams: { id: this.empresaSeleccionada.id } });
  }

  eliminarEmpresa(e: CompanyView): void {
    this.eliminarCompany(e.id);
  }

  eliminarSeleccionada(): void {
    if (!this.empresaSeleccionada) return;
    this.eliminarCompany(this.empresaSeleccionada.id);
  }

  private eliminarCompany(id: number): void {
    if (!confirm('¿Eliminar esta empresa?')) return;

    this.companyService.eliminar(id).subscribe({
      next: () => {
        this.cargarEmpresas();
        alert('Empresa eliminada');
        if (this.modalOpen) this.cerrarModal();
      },
      error: (e: unknown) => {
        console.error(e);
        alert('Error al eliminar la empresa');
      }
    });
  }

  trackByCompanyId(index: number, e: CompanyView): number {
    return e.id;
  }
}
