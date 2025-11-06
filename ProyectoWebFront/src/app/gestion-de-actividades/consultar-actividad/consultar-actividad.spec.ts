import { TestBed, ComponentFixture } from '@angular/core/testing';
import { of } from 'rxjs';
import { ConsultarActividad } from './consultar-actividad';
import { ActividadService } from '../../services/actividad.service';

describe('ConsultarActividad', () => {
  let component: ConsultarActividad;
  let fixture: ComponentFixture<ConsultarActividad>;

  const mockSvc = {
    listar: jasmine.createSpy('listar').and.returnValue(of([])),
    eliminar: jasmine.createSpy('eliminar').and.returnValue(of(void 0)),
  } as unknown as ActividadService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarActividad],
      providers: [{ provide: ActividadService, useValue: mockSvc }],
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultarActividad);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debe crearse', () => {
    expect(component).toBeTruthy();
  });

  it('aplicarBusqueda no rompe con lista vacía', () => {
    component.todasLasActividades = [];
    component.aplicarBusqueda();
    expect(component.actividades.length).toBe(0);
  });
});
