import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Filter, filterColumns, filterConditions } from '@time-tracker/shared';
import { Observable, of } from 'rxjs';
import { NewFilterDialogComponent } from '../../components/new-filter-dialog/new-filter-dialog.component';

@Component({
  selector: 'time-tracker-nx-my-filters-page',
  templateUrl: './my-filters-page.component.html',
  styleUrls: ['./my-filters-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyFiltersPageComponent implements OnInit {
  private filters: Filter[] = [
    {
      id: window.crypto.randomUUID(),
      name: 'filter One',
      column: filterColumns[0],
      condition: filterConditions[0],
      searchTerm: 'My search term1',
    },
    {
      id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb62',
      name: 'filter Two',
      column: filterColumns[1],
      condition: filterConditions[1],
      searchTerm: 'My search term2',
    },
    {
      id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb63',
      name: 'filter Three',
      column: filterColumns[2],
      condition: filterConditions[2],
      searchTerm: 'My search term3',
    },
  ];

  filters$: Observable<Filter[]> = of(this.filters);

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog() {
    console.log('Opening dialog');
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';

    this.dialog.open(NewFilterDialogComponent, dialogConfig);
  }
}
