import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HarryPotterService } from '../../services/harry-potter';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';

@Component({
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatTableModule],
  selector: 'app-books',
  styleUrl: './books.scss',
  templateUrl: './books.html',
})
export class Books {
  displayedColumns: string[] = ['title', 'releaseDate', 'pages', 'description'];
  private allBooks: any[] = [];
  filteredBooks: any[] = [];
  pagedBooks: any[] = [];

  pageSize = 5;
  pageIndex = 0;

  constructor(
    private harryPotterService: HarryPotterService,
    private cdr: ChangeDetectorRef,
  ) {
    this.harryPotterService.getBooks().subscribe((data) => {
      this.allBooks = data as any[];
      this.filteredBooks = data as any[];
      this.updatePage();
      this.cdr.markForCheck();
    });
  }

  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredBooks = this.allBooks.filter((book) => book.title.toLowerCase().includes(value));
    this.pageIndex = 0;
    this.updatePage();
  }

  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredBooks.length / this.pageSize));
  }

  updatePage() {
    const start = this.pageIndex * this.pageSize;
    const end = start + this.pageSize;
    this.pagedBooks = this.filteredBooks.slice(start, end);
  }

  nextPage() {
    if (this.pageIndex < this.totalPages - 1) {
      this.pageIndex++;
      this.updatePage();
    }
  }

  prevPage() {
    if (this.pageIndex > 0) {
      this.pageIndex--;
      this.updatePage();
    }
  }
}
