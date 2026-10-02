import { Component, signal, inject } from '@angular/core';
import { RouterOutlet,RouterLinkActive, RouterLink } from '@angular/router';
import { LanguageService } from './core/services/language';
import { TranslatePipe } from './core/i18n/translate.pipe';


@Component({
  imports: [RouterOutlet, RouterLink, RouterLinkActive, TranslatePipe],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App  {

  protected readonly title = signal('Harry Potter');

  protected languageService = inject(LanguageService);

}
