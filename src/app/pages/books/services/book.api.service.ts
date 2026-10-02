import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../../core/constants/api';
import { Book } from '../models/book.model';
import { Lang } from '../../../core/services/language'

@Injectable({ providedIn: 'root' })
export class BookApiService {
  private readonly http = inject(HttpClient);

  getBooks(lang: Lang): Observable<Book[]> {
    return this.http.get<Book[]>(`${API_BASE_URL}/${lang}/books`);
  }
}
