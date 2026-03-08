import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly isLoggedIn = signal(localStorage.getItem('portfolio-auth') === 'true');

  constructor(private readonly router: Router) {}

  login(email: string, password: string): boolean {
    const isValid = email === 'admin@jaimequiceno.es' && password === 'Admin2026!';

    if (isValid) {
      this.isLoggedIn.set(true);
      localStorage.setItem('portfolio-auth', 'true');
    }

    return isValid;
  }

  logout(): void {
    this.isLoggedIn.set(false);
    localStorage.removeItem('portfolio-auth');
    this.router.navigateByUrl('/');
  }
}
