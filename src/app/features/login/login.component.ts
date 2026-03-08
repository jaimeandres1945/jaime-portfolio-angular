import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { I18nService } from '../../core/services/i18n.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly i18n = inject(I18nService);

  protected email = 'admin@jaimequiceno.es';
  protected password = 'Admin2026!';
  protected error = signal('');

  protected t(key: string): string {
    return this.i18n.t(key);
  }

  protected submit(): void {
    const ok = this.authService.login(this.email, this.password);

    if (!ok) {
      this.error.set('Invalid credentials');
      return;
    }

    this.router.navigateByUrl('/admin');
  }
}
