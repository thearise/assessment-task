import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class TableSorterService {
    sortTable(tableData: any[], input: string, ascending: boolean) {
        return tableData.sort((a: any, b: any) => {
            if (typeof (a[input]) === 'string') {
                return ascending ? a[input].localeCompare(b[input]) : b[input].localeCompare(a[input]);
            } else {
                return ascending ? a[input] - b[input] : b[input] - a[input];
            }
        });
    }
}