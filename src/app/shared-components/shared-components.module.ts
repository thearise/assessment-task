import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule

import { SearchFilterComponent } from './search-filter/search-filter.component';

@NgModule({
  declarations: [SearchFilterComponent],
  imports: [
    CommonModule,
    FormsModule // Add FormsModule to imports
  ],
  exports: [SearchFilterComponent] // Export the component
})
export class SharedComponentsModule { }
