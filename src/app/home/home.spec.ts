import { TestBed } from '@angular/core/testing';
import { Home } from './home';
import { LocalStorageService } from '../services/local-storage.service';

describe('Home', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [Home],
      providers: [
        { provide: LocalStorageService, useValue: { getItem: () => null, removeItem: () => {} } }
      ],
    });
  });

  it('debería crearse', () => {
    const fixture = TestBed.createComponent(Home);
    const comp = fixture.componentInstance;
    fixture.detectChanges();
    expect(comp).toBeTruthy();
  });
});
