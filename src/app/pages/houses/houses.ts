import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { HOUSE_COLOR_MAP } from '../../core/constants/color';
import { House } from '../../features/house/models/house.model';
import { HouseApiService } from '../../features/house/services/house.api.service';
import {LanguageService  } from '../../core/services/language';
import { TranslatePipe } from '../../core/i18n/translate.pipe';



@Component({
  imports: [ TranslatePipe],
  selector: 'app-houses',
  styleUrl: './houses.scss',
  templateUrl: './houses.html',
})
export class Houses {
  private houseApi = inject(HouseApiService);

protected languageService = inject(LanguageService);

protected housesResource = rxResource({
  params: () => this.languageService.current(),
  stream: ({ params }) => this.houseApi.getHouses(params),
  defaultValue: [] as House[],
});

  protected getColor(colorName: string): string {
    return HOUSE_COLOR_MAP[colorName] ?? '#d1d5db';
  }
}