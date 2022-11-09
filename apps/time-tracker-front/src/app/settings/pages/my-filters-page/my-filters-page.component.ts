import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Filter } from '@time-tracker/shared';
import { Observable } from 'rxjs';
import { NewFilterDialogComponent } from '../../components/new-filter-dialog/new-filter-dialog.component';
import { selectFiltersState } from '../../state/selectors';

@Component({
  selector: 'time-tracker-nx-my-filters-page',
  templateUrl: './my-filters-page.component.html',
  styleUrls: ['./my-filters-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyFiltersPageComponent implements OnInit {
  filters$: Observable<Filter[]>;

  constructor(private dialog: MatDialog, private store: Store) {
    this.filters$ = this.store.select(selectFiltersState);
  }

  ngOnInit(): void {}

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';

    this.dialog.open(NewFilterDialogComponent, dialogConfig);
  }
}
