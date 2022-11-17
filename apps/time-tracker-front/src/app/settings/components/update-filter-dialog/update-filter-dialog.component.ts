import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
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
      column: [this.filter.column, [Validators.required]],
      condition: [this.filter.condition, [Validators.required]],
      searchTerm: [this.filter.searchTerm, [Validators.required]],
    });

    this.checkDisable();
  }

  save() {
    this.checkDisable();

    const filter: Filter = {
      ...this.filter,
      ...this.form.value,
      ...(this.form.get('searchTerm')?.disabled ? { searchTerm: '' } : {}),
    };

    this.store.dispatch(FilterActions.updateFilter({ filter }));

    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }

  checkDisable() {
    const column = this.form.get('column')?.value;
    const condition = this.form.get('condition')?.value;

    this.form.get('searchTerm')?.enable();

    if (column === '' || condition === '') {
      this.form.get('searchTerm')?.disable();
    }

    if (
      condition === this.filterConditions[2] ||
      condition === this.filterConditions[3]
    ) {
      this.form.get('searchTerm')?.disable();
    }
  }
}
