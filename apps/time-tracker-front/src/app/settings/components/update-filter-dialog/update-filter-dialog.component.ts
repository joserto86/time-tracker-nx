import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Filter, filterColumns, filterConditions } from '@time-tracker/shared';
import { FilterActions } from '../../state/actions';

@Component({
  selector: 'time-tracker-nx-update-filter-dialog',
  templateUrl: './update-filter-dialog.component.html',
  styleUrls: ['./update-filter-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UpdateFilterDialogComponent implements OnInit {
  form!: FormGroup;
  filterColumns = filterColumns;
  filterConditions = filterConditions;
  filter;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UpdateFilterDialogComponent>,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) data: { filter: Filter }
  ) {
    this.filter = data.filter;
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.filter.name, [Validators.required]],
      column: [this.filter.column, []],
      condition: [this.filter.condition, []],
      searchTerm: [this.filter.searchTerm, [Validators.required]],
    });
  }

  save() {
    const filter: Filter = {
      ...this.filter,
      ...this.form.value,
    };

    this.store.dispatch(FilterActions.updateFilter({ filter }));

    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
}
