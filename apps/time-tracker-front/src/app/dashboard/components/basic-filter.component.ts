import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { ApiFilter } from '@time-tracker/shared';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

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
export class BasicFilterComponent implements OnInit {
  public stringToSearch!: string;
  stringToSearchUpdate = new Subject<string>();
  
  constructor(private store:Store) {
    this.stringToSearchUpdate.pipe(
      debounceTime(1000),
      distinctUntilChanged())
      .subscribe(value => {
        const filters:ApiFilter[] = [
          {
            field: 'namespace',
            method: '=',
            value: `%${value}%`
          },
        ];
      
        this.store.dispatch(DashboardActions.removeSearchFilters());
        this.store.dispatch(DashboardActions.setSearchFilters({filters}));
        this.store.dispatch(DashboardActions.loadTimeNotes());
      }
    );
  }

  ngOnInit(): void {}

  // basicSearchResult(stringToSearch:string) {
  //   console.log('Resultssss ' + stringToSearch);
  // }

}
