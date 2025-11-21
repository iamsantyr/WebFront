import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarActividades } from './mostrar-actividades';

describe('MostrarActividades', () => {
  let component: MostrarActividades;
  let fixture: ComponentFixture<MostrarActividades>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarActividades]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarActividades);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
