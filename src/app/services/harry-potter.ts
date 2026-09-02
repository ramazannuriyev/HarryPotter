import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book.model';
import { House } from '../models/house.model';
import { Character } from '../models/character.model';
import { Spell } from '../models/spells.model';

@Injectable({
  providedIn: 'root',
})
export class HarryPotterService {
  private readonly baseUrl = 'https://potterapi-fedeperin.vercel.app/en';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(`${this.baseUrl}/books`);
  }

  getCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>(`${this.baseUrl}/characters`);
  }

  getCharacterByIndex(index: number) {
    return this.http.get(`${this.baseUrl}/characters`, { params: { index } });
  }

  getHouses(): Observable<House[]> {
    return this.http.get<House[]>(`${this.baseUrl}/houses`);
  }

  getSpells(): Observable<Spell[]> {
    return this.http.get<Spell[]>(`${this.baseUrl}/spells`);
  }
}
