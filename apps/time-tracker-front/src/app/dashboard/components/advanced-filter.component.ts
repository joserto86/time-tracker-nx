import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ApiFilter, filterColumns, filterConditions } from '@time-tracker/shared';
import { DashboardActions } from '../state/actions';

@Component({
  selector: 'time-tracker-nx-advanced-filter',
  template: `
    <div class="form-container">
      <mat-dialog-content [formGroup]="form" >
         
        <mat-form-field>
          <mat-label>Column</mat-label>
          <mat-select formControlName="column">
            <mat-option *ngFor="let item of filterColumns" [value]="item">
              {{ item }}
            </mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field>
          <mat-label>Condition</mat-label>
          <mat-select formControlName="condition">
            <mat-option *ngFor="let item of filterConditions" [value]="item">
              {{ item }}
            </mat-option>
          </mat-select>
        </mat-form-field>

        <mat-form-field>
          <mat-label>Search term</mat-label>
          <input
            matInput
            placeholder="My search term"
            formControlName="searchTerm"
          />
        </mat-form-field>
        <mat-icon
          (click)="save()"
        >search</mat-icon>
      </mat-dialog-content>
    </div>
  `,
  styles: [`
    .form-container {
      margin-top: 20px;
      
      mat-dialog-content {
        display:flex;
        align-items: center;
      }

      mat-form-field {
        margin-right: 20px;
        min-width: 20%;
      }
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvancedFilterComponent implements OnInit {
  form!: FormGroup;
  filterColumns = filterColumns;
  filterConditions = filterConditions;
  filters: ApiFilter[] = [];

  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      column: ['', [Validators.required]],
      condition: ['', [Validators.required]],
      searchTerm: [''],
    });
  }

  save(): void {
    console.log('asdfasdf');
    if (this.form.valid) {
      this.store.dispatch(DashboardActions.removeSearchFilters());

      this.filters = [{
        field: this.form.get('column')?.value,
        method: this.transformCondition(this.form.get('condition')?.value),
        value: this.transformSerchTerm(this.form.get('searchTerm')?.value, this.form.get('condition')?.value)
      }] ;

      this.store.dispatch(DashboardActions.setSearchFilters({filters: this.filters}));
      this.store.dispatch(DashboardActions.loadTimeNotes());
    }
  }

  private transformCondition(condition: string) {
    switch (condition) {
      case 'is': return '=';
      case 'is not': return '!=';
      case 'contains': return 'like';
      default: return condition
    }
  }

  private transformSerchTerm(searchTerm: string, condition:string) {
    if (condition === 'contains') {
      return `%${searchTerm}%`;
    }

    return searchTerm
  }
}
