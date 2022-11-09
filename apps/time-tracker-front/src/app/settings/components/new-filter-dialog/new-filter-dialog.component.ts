import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Filter, filterColumns, filterConditions } from '@time-tracker/shared';
import { Store } from '@ngrx/store';
import { FilterActions } from '../../state/actions';
@Component({
  selector: 'time-tracker-nx-new-filter-dialog',
  templateUrl: './new-filter-dialog.component.html',
  styleUrls: ['./new-filter-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewFilterDialogComponent implements OnInit {
  form!: FormGroup;
  filterColumns = filterColumns;
  filterConditions = filterConditions;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NewFilterDialogComponent>,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      column: [filterColumns[1], []],
      condition: [filterConditions[1], []],
      searchTerm: ['', [Validators.required]],
    });
  }

  save() {
    console.log(this.form.value);

    const filter: Filter = {
      id: window.crypto.randomUUID(),
      ...this.form.value,
    };

    this.store.dispatch(FilterActions.createFilter({ filter }));

    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }
}
