import { Component, OnInit, OnDestroy, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LanguageSwitcherComponent } from './shared/language-switcher/language-switcher.component';
import { AuthService } from './core/services/auth.service';
import { I18nService } from './core/services/i18n.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, LanguageSwitcherComponent],
  template: `
    <div class="shell">
      <header class="topbar">
        <a class="brand" routerLink="/">{{ appTitle() }}</a>

        <nav class="topbar__actions">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }">
            {{ t('nav.home') }}
          </a>
          @if (isLoggedIn()) {
            <a routerLink="/admin" routerLinkActive="active">{{ t('nav.admin') }}</a>
            <button type="button" class="ghost-button" (click)="logout()">{{ t('nav.logout') }}</button>
          } @else {
            <a routerLink="/login" routerLinkActive="active">{{ t('nav.login') }}</a>
          }
          <app-language-switcher />
        </nav>
      </header>

      <main>
        <router-outlet />
      </main>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
        min-height: 100vh;
      }

      .shell {
        min-height: 100vh;
      }

      .topbar {
        position: sticky;
        top: 0;
        z-index: 20;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem 1.5rem;
        backdrop-filter: blur(14px);
        background: rgba(255, 255, 255, 0.78);
        border-bottom: 1px solid rgba(138, 159, 184, 0.2);
        box-shadow: 0 8px 24px rgba(31, 53, 82, 0.05);
      }

      .brand {
        font-weight: 700;
        letter-spacing: 0.04em;
        text-decoration: none;
        color: var(--text);
      }

      .topbar__actions {
        display: flex;
        align-items: center;
        gap: 1rem;
        flex-wrap: wrap;
      }

      .topbar__actions a,
      .ghost-button {
        color: var(--text-muted);
        text-decoration: none;
        background: transparent;
        border: 0;
        cursor: pointer;
        font: inherit;
      }

      .topbar__actions a:hover,
      .ghost-button:hover {
        color: var(--text);
      }

      .active {
        color: var(--primary-hover);
        font-weight: 600;
      }
    `
  ]
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly authService = inject(AuthService);
  private readonly i18n = inject(I18nService);

  protected readonly isLoggedIn = this.authService.isLoggedIn;
  protected readonly appTitle = computed(() => this.t('app.title'));

  ngOnInit(): void {
    document.addEventListener('contextmenu', this.disableContextMenu);
    document.addEventListener('keydown', this.disableShortcuts);
  }

  ngOnDestroy(): void {
    document.removeEventListener('contextmenu', this.disableContextMenu);
    document.removeEventListener('keydown', this.disableShortcuts);
  }

  protected t(key: string): string {
    return this.i18n.t(key);
  }

  protected logout(): void {
    this.authService.logout();
  }

  private readonly disableContextMenu = (event: MouseEvent): void => {
    event.preventDefault();
  };

  private readonly disableShortcuts = (event: KeyboardEvent): void => {
    const key = event.key.toLowerCase();

    const blocked =
      event.key === 'F12' ||
      (event.ctrlKey && ['u', 'c', 's', 'a', 'p'].includes(key)) ||
      (event.ctrlKey && event.shiftKey && ['i', 'j', 'c'].includes(key));

    if (blocked) {
      event.preventDefault();
    }
  };
}