import { Routes } from '@angular/router';
import { Books } from './pages/books/books';
import { Houses} from './pages/houses/houses'
import { Characters } from './pages/characters/characters';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'books',
    pathMatch: 'full'
  },
  {
    path: 'books',
    component: Books
  },

  {
    path: 'houses',
    component: Houses
  },

  {
    path: 'characters',
    component: Characters
  }
];