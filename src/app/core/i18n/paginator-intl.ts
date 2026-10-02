import { Injectable, effect, inject } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { LanguageService } from '../services/language';
import { TRANSLATIONS } from './translations';

@Injectable()
export class AppPaginatorIntl extends MatPaginatorIntl {
  private languageService = inject(LanguageService);

  constructor() {
    super();

    effect(() => {
      const lang = this.languageService.current();
      const t = TRANSLATIONS[lang];

      this.itemsPerPageLabel = t['paginator.itemsPerPage'];
      this.nextPageLabel = t['paginator.next'];
      this.previousPageLabel = t['paginator.previous'];
      this.firstPageLabel = t['paginator.first'];
      this.lastPageLabel = t['paginator.last'];

      this.getRangeLabel = (page: number, pageSize: number, length: number): string => {
        if (length === 0 || pageSize === 0) {
          return `0 ${t['paginator.of']} ${length}`;
        }
        const startIndex = page * pageSize;
        const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
        return `${startIndex + 1} – ${endIndex} ${t['paginator.of']} ${length}`;
      };

      this.changes.next();
    });
  }
}