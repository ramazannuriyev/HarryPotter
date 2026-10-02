import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../../core/constants/api';
import { House } from '../models/house.model';
import { Lang } from '../../../core/services/language'


@Injectable({ providedIn: 'root' })
export class HouseApiService {
  private readonly http = inject(HttpClient);

  getHouses(lang: Lang): Observable<House[]> {
    return this.http.get<House[]>(`${API_BASE_URL}/${lang}/houses`);
  }
}
