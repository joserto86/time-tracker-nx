import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  ApiFilter,
  filterColumns,
  filterConditions,
} from '@time-tracker/shared';
import { Subject, Subscription } from 'rxjs';
import { FilterService } from '../../shared/services/filter.sevice';
import { DashboardActions } from '../state/actions';

@Component({
  selector: 'time-tracker-nx-advanced-filter',
  template: `
    <div class="form-container">
      <mat-dialog-content [formGroup]="form">
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
          class="add-filter"
          matTooltip="Add filter"
          (click)="addFilter()"
          >add_circle</mat-icon
        >
        <mat-icon
          class="search"
          matTooltip="Apply Filters"
          [ngClass]="{ hidden: filters.length === 0 }"
          (click)="search()"
          >search</mat-icon
        >
      </mat-dialog-content>
    </div>

    <div class="filter-boxes">
      <time-tracker-nx-advanced-filter-box
        *ngFor="let filter of filters; let i = index"
        [filter]="filter"
        [index]="i"
        (deleteFilter)="deleteFilter($event)"
      ></time-tracker-nx-advanced-filter-box>
    </div>
  `,
  styles: [
    `
      .form-container {
        margin-top: 20px;

        mat-dialog-content {
          display: flex;
          align-items: center;
        }

        mat-form-field {
          margin-right: 20px;
          min-width: 20%;
        }
      }

      .filter-boxes {
        display: flex;
      }

      .add-filter {
        color: #3f51b5;
        margin-right: 10px;
        cursor: pointer;
      }

      .search {
        cursor: pointer;
      }

      .search.hidden {
        display: none;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdvancedFilterComponent implements OnInit {
  form!: FormGroup;
  filterColumns = filterColumns;
  filterConditions = filterConditions;
  filters: ApiFilter[] = [];

  selectConditionUpdate = new Subject<string>();
  selectColumUpdate = new Subject<string>();

  conditionSubscription: Subscription | undefined;
  columnSubscription!: Subscription | undefined;

  columnValue: string = '';
  conditionValue: string = '';

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private filterService: FilterService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      column: ['', [Validators.required]],
      condition: ['', [Validators.required]],
      searchTerm: [{ value: '', disabled: true }],
    });

    this.columnSubscription = this.form.get('column')?.valueChanges.subscribe(column => {
      this.columnValue = column;
      this.manageSearchTerm();
    });

    this.conditionSubscription = this.form.get('condition')?.valueChanges.subscribe(condition => {
      this.conditionValue = condition;
      this.manageSearchTerm();
    });
  }

  search(): void {
    this.store.dispatch(DashboardActions.removeSearchFilters());

    this.store.dispatch(
      DashboardActions.setSearchFilters({
        filters: this.filterService.transformFilters(this.filters),
        advanced: true,
      })
    );
    this.store.dispatch(DashboardActions.loadTimeNotes());
  }

  addFilter(): void {
    if (this.form.valid &&
      (
        (this.conditionValue === 'is null' || this.conditionValue === 'is not null' ) ||
        (this.conditionValue !== 'is null' && this.conditionValue !== 'is not null' && this.form.get('searchTerm')?.value)
      )
    ) {
      const filter: ApiFilter = {
        field: this.form.get('column')?.value,
        method: this.form.get('condition')?.value,
        value: this.form.get('searchTerm')?.value,
      };

      this.filters.push(filter);
      this.form.reset();
    }
  }

  deleteFilter(index: number): void {
    this.filters.splice(index, 1);
  }

  ngOnDestroy(): void {
    this.conditionSubscription?.unsubscribe();
    this.columnSubscription?.unsubscribe();
  }

  manageSearchTerm() {
    if (this.columnValue && this.conditionValue) {
      if (
        this.conditionValue === 'is null' ||
        this.conditionValue === 'is not null'
      ) {
        this.form.get('searchTerm')?.disable();
      } else {
        this.form.get('searchTerm')?.enable();
      }
    } else {
      this.form.get('searchTerm')?.disable();
    }
  }
}
