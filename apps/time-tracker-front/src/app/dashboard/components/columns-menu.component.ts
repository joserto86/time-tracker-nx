import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Columns } from '../../../../../../libs/src/lib/settings';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { atLeastOneCheckboxCheckedValidator } from '../../settings/validators/profile.validator';
import { saveDefaultColumns } from '../state/actions/dashboard-actions';

@Component({
  selector: 'time-tracker-nx-columns-menu',
  template: `
    <button
      color="primary"
      class="right"
      mat-raised-button
      [matMenuTriggerFor]="columnsMenu"
    >
      COLUMNS
    </button>
    <mat-menu #columnsMenu="matMenu">
      <form
        (click)="$event.stopPropagation()"
        class="menu-container"
        [formGroup]="form"
      >
        <div formGroupName="defaultColumns">
          <mat-checkbox
            *ngFor="let checkbox of checkboxList"
            class="checkbox"
            [formControlName]="checkbox.name"
            >{{ checkbox.label }}</mat-checkbox
          >
        </div>
      </form>
      <mat-error *ngIf="form.invalid">Check at least one column</mat-error>
    </mat-menu>
  `,
  styles: [
    `
      .menu-container {
        flex-direction: column;
        padding: 15px;
      }

      mat-error {
        padding-left: 15px;
      }

      .checkbox {
        width: 100%;
        margin-bottom: 15px;
      }

      .checkbox:last-child() {
        border-color: green;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnsMenuComponent implements OnInit, OnDestroy {
  @Input() defaultColumns!: Columns;

  form!: FormGroup;

  subscriptions: Subscription[] = [];

  checkboxList: { name: string; label: string }[] = [];

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.createForm();

    const subscription$ = this.form.valueChanges.subscribe(
      ({ defaultColumns }) => {
        if (this.form.valid) {
          this.store.dispatch(saveDefaultColumns({ defaultColumns }));
        }
      }
    );

    this.subscriptions.push(subscription$);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  createForm() {
    this.form = this.fb.group({
      defaultColumns: this.getDefaultColumns(),
    });

    this.form
      .get(['defaultColumns'])
      ?.setValidators(atLeastOneCheckboxCheckedValidator());

    Object.keys(this.defaultColumns).forEach((key) => {
      this.checkboxList.push({ name: key, label: key });
    });
  }

  getDefaultColumns() {
    const columns = this.defaultColumns;
    return this.fb.group(columns);
  }
}
