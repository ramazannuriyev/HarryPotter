import { Component, computed, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { Book } from './models/book.model';
import { BookApiService } from './services/book.api.service';
import { LanguageService } from '../../core/services/language';
import { TranslatePipe } from '../../core/i18n/translate.pipe';

@Component({
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatPaginatorModule, TranslatePipe],
  selector: 'app-books',
  styleUrl: './books.scss',
  templateUrl: './books.html',
})
export class Books {
  protected displayedColumns: string[] = ['title', 'releaseDate', 'pages', 'description'];

  private bookApi = inject(BookApiService);

  private search = signal('');
  protected pageSize = signal(5);
  protected pageIndex = signal(0);

  protected languageService = inject(LanguageService);

  protected booksResource = rxResource({
    params: () => this.languageService.current(),
    stream: ({ params }) => this.bookApi.getBooks(params),
    defaultValue: [] as Book[],
  });

  protected filteredBooks = computed(() => {
    const value = this.search().trim().toLowerCase();
    const books = this.booksResource.value();
    if (!value) {
      return books;
    }
    return books.filter((book) => book.title.toLowerCase().includes(value));
  });

  protected pagedBooks = computed(() => {
    const start = this.pageIndex() * this.pageSize();
    return this.filteredBooks().slice(start, start + this.pageSize());
  });

  protected applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.search.set(value);
    this.pageIndex.set(0);
  }

  protected onPageChange(event: PageEvent) {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }
}
