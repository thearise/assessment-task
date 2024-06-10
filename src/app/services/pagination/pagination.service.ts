// pagination.service.ts
import { Injectable } from '@angular/core';

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
    let updatePagiRemoveDuplicate = this.removeDuplicates(paginationRange);

    return updatePagiRemoveDuplicate;
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
}
