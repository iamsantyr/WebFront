import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsultarProceso } from './consultar-proceso';

describe('ConsultarProceso', () => {
  let component: ConsultarProceso;
  let fixture: ComponentFixture<ConsultarProceso>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarProceso]  // El componente ya incluye ReactiveFormsModule y CommonModule
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultarProceso);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize searchForm with empty values', () => {
    expect(component.searchForm).toBeDefined();
    expect(component.searchForm.get('terminoBusqueda')?.value).toBe('');
    expect(component.searchForm.get('filtroFecha')?.value).toBe('');
    expect(component.searchForm.get('filtroDuracion')?.value).toBe(0);
    expect(component.searchForm.get('filtroEstado')?.value).toBe('');
  });

  it('should toggle filter panel', () => {
    expect(component.mostrarFiltro).toBe(false);
    component.toggleFiltro();
    expect(component.mostrarFiltro).toBe(true);
    component.toggleFiltro();
    expect(component.mostrarFiltro).toBe(false);
  });

  it('should initialize with empty procesos arrays', () => {
    expect(component.procesos).toEqual([]);
    expect(component.todosLosProcesos).toEqual([]);
  });

  it('should initialize modal as closed', () => {
    expect(component.modalOpen).toBe(false);
    expect(component.procesoSeleccionado).toBeNull();
  });
});
