import { Injectable, signal } from '@angular/core';
import es from '../../../assets/i18n/es.json';
import en from '../../../assets/i18n/en.json';
import { Locale } from '../models/portfolio.model';

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly dictionaries: Record<Locale, Record<string, string>> = {
    es,
    en
  };

  readonly locale = signal<Locale>((localStorage.getItem('portfolio-locale') as Locale) || 'es');

  setLocale(locale: Locale): void {
    this.locale.set(locale);
    localStorage.setItem('portfolio-locale', locale);
    document.documentElement.lang = locale;
  }

  t(key: string): string {
    return this.dictionaries[this.locale()][key] ?? key;
  }
}
