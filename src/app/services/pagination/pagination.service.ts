import { Injectable } from '@angular/core';
import { Photo } from '../../services/photos/photo.model';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {
  constructor() {}

  calculatePaginationRange(currentPage: number, totalPages: number): (number | string)[] {
    const paginationRange: (number | string)[] = [];
    const startPage = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
    const endPage = Math.min(totalPages, startPage + 4);

    paginationRange.push(1);

    if (startPage > 2) {
      paginationRange.push('...');
    }

    for (let i = startPage; i <= endPage; i++) {
      paginationRange.push(i);
    }

    if (endPage < totalPages - 1) {
      paginationRange.push('...');
    }

    paginationRange.push(totalPages);

    return this.removeDuplicates(paginationRange);
  }

  removeDuplicates(array: (number | string)[]): (number | string)[] {
    const uniqueArray: (number | string)[] = [];
    const set = new Set();

    array.forEach(item => {
      if (item === '...') {
        uniqueArray.push(item);
      } else {
        if (item !== '...' && !set.has(item)) {
          set.add(item);
          uniqueArray.push(item);
        }
      }
    });

    return uniqueArray;
  }

  getPaginatedItems<T>(items: T[], currentPage: number, itemsPerPage: number): T[] {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  }

  getTotalPages(items: any[], itemsPerPage: number): number {
    return Math.ceil(items.length / itemsPerPage);
  }
}
