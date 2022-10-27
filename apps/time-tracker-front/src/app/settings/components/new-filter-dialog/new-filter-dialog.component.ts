import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { filterColumns, filterConditions } from '@time-tracker/shared';

interface Data {
  description: string;
}

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
    private dialogRef: MatDialogRef<NewFilterDialogComponent>
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

    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}
//https://blog.angular-university.io/angular-material-dialog/
