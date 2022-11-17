import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Filter, filterColumns, filterConditions } from '@time-tracker/shared';
import { Store } from '@ngrx/store';
import { FilterActions } from '../../state/actions';
import { Observable, Subscription } from 'rxjs';
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

  formSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<NewFilterDialogComponent>,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      column: ['', [Validators.required]],
      condition: ['', [Validators.required]],
      searchTerm: [''],
    });

    this.form.get('searchTerm')?.disable();

    this.checkDisable();
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
