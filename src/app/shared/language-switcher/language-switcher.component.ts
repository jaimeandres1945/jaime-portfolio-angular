import { Component, inject } from '@angular/core';
import { I18nService } from '../../core/services/i18n.service';
import { Locale } from '../../core/models/portfolio.model';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  template: `
    <div class="switcher">
      @for (locale of locales; track locale) {
        <button
          type="button"
          [class.active]="i18n.locale() === locale"
          (click)="setLocale(locale)">
          {{ locale.toUpperCase() }}
        </button>
      }
    </div>
  `,
  styles: [
    `
      .switcher {
        display: inline-flex;
        border: 1px solid rgba(138, 159, 184, 0.22);
        border-radius: 999px;
        overflow: hidden;
      }

      button {
        border: 0;
        background: transparent;
        color: var(--text-muted);
        padding: 0.4rem 0.8rem;
        cursor: pointer;
      }

      .active {
        background: var(--primary-soft);
        color: var(--primary-hover);
      }
    `
  ]
})
export class LanguageSwitcherComponent {
  readonly i18n = inject(I18nService);
  readonly locales: Locale[] = ['es', 'en'];

  setLocale(locale: Locale): void {
    this.i18n.setLocale(locale);
  }
}
