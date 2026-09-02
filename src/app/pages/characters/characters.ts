import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HarryPotterService } from '../../services/harry-potter';
import { Character } from '../../models/character.model';
import { MatTableModule } from '@angular/material/table';
import { House } from '../../models/house.model';
import { HOUSE_COLOR_MAP } from '../../constants/house-colors';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CharacterDetailsDialog } from './character-details-dialog/character-details-dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  selector: 'app-characters',
  styleUrl: './characters.scss',
  templateUrl: './characters.html',
})
export class Characters {
  displayedColumns: string[] = ['fullName', 'birthdate', 'hogwartsHouse', 'nickname'];
  allCharacters = signal<Character[]>([]);
  houses = signal<House[]>([]);

  search = signal('');
  pageSize = 5;
  pageIndex = signal(0);

  constructor(
    private harryPotterService: HarryPotterService,
    private dialog: MatDialog,
  ) {
    this.harryPotterService.getCharacters().subscribe((data) => {
      this.allCharacters.set(data);
    });

    this.harryPotterService.getHouses().subscribe((data) => {
      this.houses.set(data);
    });
  }

  get filteredCharacters(): Character[] {
    const value = this.search().trim().toLowerCase();
    if (!value) {
      return this.allCharacters();
    }
    return this.allCharacters().filter((c) => c.fullName.toLowerCase().includes(value));
  }

  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.search.set(value);
    this.pageIndex.set(0);
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredCharacters.length / this.pageSize));
  }

  get pagedCharacters(): Character[] {
    const start = this.pageIndex() * this.pageSize;
    const end = start + this.pageSize;
    return this.filteredCharacters.slice(start, end);
  }

  nextPage() {
    if (this.pageIndex() < this.totalPages - 1) {
      this.pageIndex.update((v) => v + 1);
    }
  }

  prevPage() {
    if (this.pageIndex() > 0) {
      this.pageIndex.update((v) => v - 1);
    }
  }

  getHouseByName(name: string): House | undefined {
    return this.houses().find((h) => h.house === name);
  }

  getColor(colorName: string): string {
    return HOUSE_COLOR_MAP[colorName] ?? '#d1d5db';
  }

  openDetails(character: Character) {
    this.dialog.open(CharacterDetailsDialog, {
      data: character,
    });
  }
}
