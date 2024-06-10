import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SortBy } from 'src/app/services/sortby/sortby.model';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrl: './search-filter.component.css'
})
export class SearchFilterComponent {
  searchQuery: string = '';
  sortBy: string = '';

  @Output() onSearchEvent = new EventEmitter<string>();
  @Output() onSortChangeEvent = new EventEmitter<any>();
  @Input() sortByInput: SortBy[] = [];
  @Input() searchQueryInput: string = '';

  ngOnInit(): void {
    if(this.sortByInput && this.sortByInput.length > 0) {
      this.sortBy = this.sortByInput[0].sort;
    }
    if(this.searchQueryInput) {
      this.searchQuery = this.searchQueryInput;
    }
  }

  onSearch() {
    this.onSearchEvent.emit(this.searchQuery);
  }

  onSortChange(event: any) {
    this.onSortChangeEvent.emit(event);
  }
}
