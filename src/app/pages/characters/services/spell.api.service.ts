import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../../core/constants/api';
import { Spell } from '../models/spells.model';
import { Lang } from '../../../core/services/language';

@Injectable({ providedIn: 'root' })
export class SpellApiService {
  private readonly http = inject(HttpClient);

  getSpells(lang: Lang): Observable<Spell[]> {
    return this.http.get<Spell[]>(`${API_BASE_URL}/${lang}/spells`);
  }
}
