import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Store } from '@ngrx/store';
import { ApiFilter, CONDITIONS } from '@time-tracker/shared';
import { debounceTime, distinctUntilChanged, Subject, Subscription } from 'rxjs';

import { DashboardActions } from '../state/actions';

@Component({
  selector: 'time-tracker-nx-basic-filter',
  template: `
    <div class="elements">
      <mat-form-field class="">
        <input
          #searchInput
          matInput
          [(ngModel)]="stringToSearch"
          type="text"
          name="stringToSearch"
          id="stringToSearch"
          (ngModelChange)="this.stringToSearchUpdate.next($event)"
        />
        <mat-hint>All rows with the selected text will show</mat-hint>
        <!-- <mat-icon (click)="basicSearchResult(stringToSearch.value)">search</mat-icon> -->
        <mat-icon>search</mat-icon>
      </mat-form-field>
      <mat-icon *ngIf="searchInput.value"
        matTooltip="Clean Search"
        class="delete"
        (click)="delete(searchInput)"
      >delete</mat-icon>
    </div>
  `,
  styles: [
    `
      mat-form-field {
        padding: 16px;
        width: 25%;
      }
      ::ng-deep div.mat-form-field-infix {
        display: flex;
        justify-content: space-between;
      }

      .elements {
        display: flex;
        align-items: center;
      }

      mat-icon {
        cursor: pointer;
        &.delete {
          margin-left: 10px;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicFilterComponent implements OnInit, OnDestroy{
  stringToSearch!: string;
  stringToSearchUpdate = new Subject<string>();

  searchSubscription:Subscription;
  
  constructor(private store:Store) {
    this.searchSubscription = this.stringToSearchUpdate.pipe(
      debounceTime(1000),
      distinctUntilChanged())
      .subscribe(value => {
        this.store.dispatch(DashboardActions.removeSearchFilters());

        if (value) {
          const filters:ApiFilter[] = [
            {
              field: 'namespace',
              method: 'like',
              value: `%${value}%`,
              condition: CONDITIONS.OR
            }, {
              field: 'project',
              method: 'like',
              value: `%${value}%`,
              condition: CONDITIONS.OR
            }, {
              field: 'milestone',
              method: 'like',
              value: `%${value}%`,
              condition: CONDITIONS.OR
            }, {
              field: 'issue',
              method: 'like',
              value: `%${value}%`,
              condition: CONDITIONS.OR
            }, {
              field: 'labels',
              method: 'like',
              value: `%${value}%`,
              condition: CONDITIONS.OR
            },
          ];

          this.store.dispatch(DashboardActions.setSearchFilters({filters}));
        } 
         
        this.store.dispatch(DashboardActions.setAdvancedSearch({advanced: false}));
        this.store.dispatch(DashboardActions.loadTimeNotes());
      }
    );
  }
  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }

  delete(input: HTMLInputElement) {
    input.value = '';
    this.stringToSearchUpdate.next('');
  }

  ngOnInit(): void {}

}
