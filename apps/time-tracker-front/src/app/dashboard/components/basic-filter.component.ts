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
    <div class="">
      <mat-form-field class="">
        <!-- <input type="search" matInput placeholder="Write your search term" #stringToSearch /> -->
        <input
          class=""
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
      mat-icon {
        cursor: pointer;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicFilterComponent implements OnInit, OnDestroy{
  public stringToSearch!: string;
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
            },
          ];

          this.store.dispatch(DashboardActions.setSearchFilters({filters}));

        } 
         
        this.store.dispatch(DashboardActions.loadTimeNotes());
      }
    );
  }
  ngOnDestroy(): void {
    this.searchSubscription.unsubscribe();
  }

  ngOnInit(): void {}

}
