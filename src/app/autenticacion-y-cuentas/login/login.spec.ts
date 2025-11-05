import { TestBed } from '@angular/core/testing';
import { Login } from './login';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { of } from 'rxjs';

describe('Login', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        { provide: AuthService, useValue: { login: () => of({ success: true }) } },
        { provide: LocalStorageService, useValue: { setItem: () => {}, getItem: () => null } }
      ],
    });
  });

  it('debería crearse', () => {
    const fixture = TestBed.createComponent(Login);
    const comp = fixture.componentInstance;
    fixture.detectChanges();
    expect(comp).toBeTruthy();
  });
});
