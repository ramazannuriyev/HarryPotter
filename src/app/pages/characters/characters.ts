import { Component, computed, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { HOUSE_COLOR_MAP } from '../../core/constants/color';
import { House } from '../../features/house/models/house.model';
import { HouseApiService } from '../../features/house/services/house.api.service';
import { CharacterDetailsDialog } from './components/character-details-dialog/character-details-dialog';
import { Character } from './models/character.model';
import { CharacterApiService } from './services/character.api.service';
import { LanguageService } from '../../core/services/language';
import { TranslatePipe } from '../../core/i18n/translate.pipe';

@Component({
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    TranslatePipe,
  ],
  selector: 'app-characters',
  styleUrl: './characters.scss',
  templateUrl: './characters.html',
})
export class Characters {
  protected displayedColumns: string[] = ['fullName', 'birthdate', 'hogwartsHouse', 'nickname'];

  private search = signal('');
  protected pageSize = signal(5);
  protected pageIndex = signal(0);

  private characterApi = inject(CharacterApiService);
  private houseApi = inject(HouseApiService);
  private dialog = inject(MatDialog);

  protected languageService = inject(LanguageService);

  private charactersResource = rxResource({
    params: () => this.languageService.current(),
    stream: ({ params }) => this.characterApi.getCharacters(params),
    defaultValue: [] as Character[],
  });

  private housesResource = rxResource({
    params: () => this.languageService.current(),
    stream: ({ params }) => this.houseApi.getHouses(params),
    defaultValue: [] as House[],
  });

  protected filteredCharacters = computed(() => {
    const value = this.search().trim().toLowerCase();
    const characters = this.charactersResource.value();
    if (!value) {
      return characters;
    }
    return characters.filter((c) => c.fullName.toLowerCase().includes(value));
  });

  protected applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.search.set(value);
    this.pageIndex.set(0);
  }

  protected pagedCharacters = computed(() => {
    const start = this.pageIndex() * this.pageSize();
    const end = start + this.pageSize();
    return this.filteredCharacters().slice(start, end);
  });

  protected onPageChange(event: PageEvent) {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }

  protected getHouseByName(name: string): House | undefined {
    return this.housesResource.value().find((h) => h.house === name);
  }

  protected getColor(colorName: string): string {
    return HOUSE_COLOR_MAP[colorName] ?? '#d1d5db';
  }

  protected openDetails(character: Character) {
    const houseClass = 'house-panel-' + character.hogwartsHouse.toLowerCase();

    const dialogRef = this.dialog.open(CharacterDetailsDialog, {
      data: character,
      panelClass: houseClass,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.charactersResource.update((list) => [...list]);
    });
  }
}
