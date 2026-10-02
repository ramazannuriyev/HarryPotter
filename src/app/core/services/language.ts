import { Injectable, signal } from '@angular/core';

export type Lang = 'en' | 'it';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  readonly current = signal<Lang>('en');

  setLanguage(lang: Lang) {
    this.current.set(lang);
  }
}