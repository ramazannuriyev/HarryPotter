import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import {
  ReactiveFormsModule,
  FormBuilder,
  AbstractControl,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Character } from '../../models/character.model';
import { Spell } from '../../models/spells.model';
import { SpellApiService } from '../../services/spell.api.service';
import { LanguageService } from '../../../../core/services/language';
import { TranslatePipe } from '../../../../core/i18n/translate.pipe';

function notInFuture(control: AbstractControl): ValidationErrors | null {
  const value = control.value as Date | null;
  if (!value) {
    return null;
  }
  return value.getTime() > Date.now() ? { futureDate: true } : null;
}

@Component({
  imports: [
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    TranslatePipe,
  ],
  selector: 'app-character-details-dialog',
  styleUrl: './character-details-dialog.scss',
  templateUrl: './character-details-dialog.html',
})
export class CharacterDetailsDialog {
  protected mode = signal<'view' | 'edit'>('view');

  protected character = inject<Character>(MAT_DIALOG_DATA);
  private spellApi = inject(SpellApiService);
  private fb = inject(FormBuilder);

 protected languageService = inject(LanguageService);

  protected allSpells = rxResource({
    params: () => this.languageService.current(),
    stream: ({ params }) => this.spellApi.getSpells(params),
    defaultValue: [] as Spell[],
  });

  protected editForm = this.fb.group({
    interpretedBy: [''],
    birthdate: [null as Date | null, [Validators.required, notInFuture]],
    children: [''],
    spells: [[] as string[]],
  });

  protected startEdit() {
    this.editForm.patchValue({
      interpretedBy: this.character.interpretedBy,
      birthdate: new Date(this.character.birthdate),
      children: this.character.children?.join(', ') ?? '',
      spells: this.character.spells ?? [],
    });
    this.mode.set('edit');
  }

  protected save() {
    if (this.editForm.invalid) {
      this.editForm.markAllAsTouched();
      return;
    }

    const value = this.editForm.value;
    this.character.interpretedBy = value.interpretedBy ?? '';

    if (value.birthdate) {
      this.character.birthdate = value.birthdate.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    }

    this.character.children = (value.children ?? '')
      .split(',')
      .map((c) => c.trim())
      .filter((c) => c.length > 0);

    this.character.spells = value.spells ?? [];
    this.mode.set('view');
  }
}
