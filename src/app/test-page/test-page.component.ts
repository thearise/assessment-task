import { Component } from '@angular/core';
import { TableSorterService } from '../services/table-sorter.service';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.css']
})
export class TestPageComponent {
  tableData = [
    {
      'name': 'Shwe',
      'score': 5,
      'ranking': 2.5
    },
    {
      'name': 'Htet',
      'score': 4,
      'ranking': 3
    },
    {
      'name': 'Phyo',
      'score': 5,
      'ranking': 1.5
    },
    {
      'name': 'Wai',
      'score': 1,
      'ranking': 1.8
    }
  ];

  sortItem: string | undefined;
  ascending = true;

  constructor(private tableSorterService: TableSorterService) { }

  ngOnInit(): void {

  }

  sortTable(input: string) {
    if (input === this.sortItem) {
      this.ascending = !this.ascending;
    }
    this.sortItem = input;
    this.tableData = this.tableSorterService.sortTable(this.tableData, input, this.ascending);
  }
}
