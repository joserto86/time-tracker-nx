import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import {
  ApiFilter,
  Filter,
  filterColumns,
  filterConditions,
} from '@time-tracker/shared';
import { map, Observable, Subject, Subscription } from 'rxjs';
import { FilterService } from '../../shared/services/filter.sevice';
import { DashboardActions } from '../state/actions';
import * as fromSettings from '../../settings/state/selectors';

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
        <mat-icon *ngIf="filters.length > 0"
          class="search"
          matTooltip="Apply Filters"
          (click)="search()"
          >search</mat-icon
        >
        <mat-icon *ngIf="((storedFilters$ | async) || []).length > 0 && !storedFiltersLoaded"
          class="load-filters"
          matTooltip="Load Filters"
          (click)="loadFilters()"
        >turned_in</mat-icon
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

      .add-filter, .load-filters {
        color: #3f51b5;
        margin-right: 10px;
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
  storedFiltersLoaded = false;
  
  storedFilters$!:Observable<Filter[]>;

  selectConditionUpdate = new Subject<string>();
  selectColumUpdate = new Subject<string>();

  conditionSubscription: Subscription | undefined;
  columnSubscription: Subscription | undefined;

  columnValue: string = '';
  conditionValue: string = '';

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private filterService: FilterService
  ) {
    this.storedFilters$ = this.store.select(fromSettings.selectFiltersState);
  }

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
    if (this.filters.length === 0) {
      this.storedFiltersLoaded = false;
    }
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

  loadFilters() {
    this.storedFiltersLoaded = true;
    this.storedFilters$
    .pipe(
      map((filters) => {
        return filters.reduce((acc:ApiFilter[], f) => {
          return [...acc, this.filterService.transformFilterToApiFilter(f)];
        }, [])
      })
    ).subscribe(storedFilters => {
      this.filters = [...this.filters, ...storedFilters];
    }).unsubscribe();
  }
}
