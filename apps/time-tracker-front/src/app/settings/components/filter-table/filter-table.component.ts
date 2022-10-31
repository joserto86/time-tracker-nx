import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Filter } from '@time-tracker/shared';
import { deleteFilter } from '../../state/actions/filter.actions';
import { selectFilter } from '../../state/selectors';
import { UpdateFilterDialogComponent } from '../update-filter-dialog/update-filter-dialog.component';

@Component({
  selector: 'time-tracker-nx-filter-table',
  templateUrl: './filter-table.component.html',
  styleUrls: ['./filter-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterTableComponent implements OnInit {
  @Input() filters!: Filter[];

  displayedColumns: string[] = [
    'name',
    'column',
    'condition',
    'searchTerm',
    'actions',
  ];

  constructor(private dialog: MatDialog, private store: Store) {}

  ngOnInit(): void {}

  onDeleteFilter(id: string) {
    this.store.dispatch(deleteFilter({ id }));
  }

  openUpdateFilterDialog(filter: Filter) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    dialogConfig.data = {
      filter,
    };

    this.dialog.open(UpdateFilterDialogComponent, dialogConfig);
  }
}
