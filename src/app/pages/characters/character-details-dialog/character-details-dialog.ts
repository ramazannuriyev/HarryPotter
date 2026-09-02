import { Component, Inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { HarryPotterService } from '../../../services/harry-potter';
import { Character } from '../../../models/character.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Spell } from '../../../models/spells.model';

@Component({
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
  ],
  selector: 'app-character-details-dialog',
  styleUrl: './character-details-dialog.scss',
  templateUrl: './character-details-dialog.html',
})
export class CharacterDetailsDialog {
  mode = signal<'view' | 'edit'>('view');
  allSpells = signal<Spell[]>([]);

  editInterpretedBy = '';
  editBirthdate: Date | null = null;
  editChildren = '';
  editSpells: string[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public character: Character,
    private harryPotterService: HarryPotterService,
  ) {
    this.harryPotterService.getSpells().subscribe((data) => {
      this.allSpells.set(data);
    });
  }

  startEdit() {
    this.editInterpretedBy = this.character.interpretedBy;
    this.editBirthdate = new Date(this.character.birthdate);
    this.editChildren = this.character.children?.join(', ') ?? '';
    this.editSpells = this.character.spells ?? [];
    this.mode.set('edit');
  }

  save() {
    this.character.interpretedBy = this.editInterpretedBy;
    if (this.editBirthdate) {
      this.character.birthdate = this.editBirthdate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    }
    this.character.children = this.editChildren
      .split(',')
      .map((c) => c.trim())
      .filter((c) => c.length > 0);
    this.character.spells = this.editSpells;
    this.mode.set('view');
  }
}
