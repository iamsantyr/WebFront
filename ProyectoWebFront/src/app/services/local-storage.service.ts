import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  
  private isLocalStorageAvailable(): boolean {
    try {
      const test = '__localStorage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

 
  getItem(key: string): string | null {
    if (typeof window !== 'undefined' && this.isLocalStorageAvailable()) {
      try {
        return localStorage.getItem(key);
      } catch (e) {
        console.warn('Error al acceder al localStorage:', e);
        return null;
      }
    }
    return null;
  }

  setItem(key: string, value: string): void {
    if (typeof window !== 'undefined' && this.isLocalStorageAvailable()) {
      try {
        localStorage.setItem(key, value);
      } catch (e) {
        console.warn('Error al guardar en localStorage:', e);
      }
    }
  }

 
  removeItem(key: string): void {
    if (typeof window !== 'undefined' && this.isLocalStorageAvailable()) {
      try {
        localStorage.removeItem(key);
      } catch (e) {
        console.warn('Error al eliminar del localStorage:', e);
      }
    }
  }


  clear(): void {
    if (typeof window !== 'undefined' && this.isLocalStorageAvailable()) {
      try {
        localStorage.clear();
      } catch (e) {
        console.warn('Error al limpiar localStorage:', e);
      }
    }
  }
}