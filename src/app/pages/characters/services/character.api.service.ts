import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../../core/constants/api';
import { Character } from '../models/character.model';
import { Lang } from '../../../core/services/language'


@Injectable({ providedIn: 'root' })
export class CharacterApiService {
  private readonly http = inject(HttpClient);

  getCharacters(lang: Lang): Observable<Character[]> {
    return this.http.get<Character[]>(`${API_BASE_URL}/${lang}/characters`);
  }
}
