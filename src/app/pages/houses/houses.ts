import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { HarryPotterService } from '../../services/harry-potter';
import { House } from '../../models/house.model';
import { HOUSE_COLOR_MAP } from '../../constants/house-colors';

@Component({
  imports: [CommonModule],
  selector: 'app-houses',
  styleUrl: './houses.scss',
  templateUrl: './houses.html',
})
export class Houses {
  houses$: Observable<House[]>;

  constructor(private harryPotterService: HarryPotterService) {
    this.houses$ = this.harryPotterService.getHouses();
  }

  getColor(colorName: string): string {
    return HOUSE_COLOR_MAP[colorName] ?? '#d1d5db';
  }
}