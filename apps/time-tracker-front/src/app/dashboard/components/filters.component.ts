import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Columns } from '@time-tracker/shared';
import { DashboardActions } from '../state/actions';

@Component({
  selector: 'time-tracker-nx-filters',
  template: `
     <mat-card>
      <div class="buttons">
        <button color="primary" mat-raised-button (click)="onClickBasicSearch()">
          SEARCH
        </button>
        <button color="primary" mat-raised-button (click)="onClickAdvancedSearch()">FILTERS</button>
        
        <span class="spacer"></span>
  
        <time-tracker-nx-columns-menu
          [defaultColumns]="defaultColumns"
          class="right"
        ></time-tracker-nx-columns-menu>
      </div>
     
      <div>
        <time-tracker-nx-basic-filter [hidden]="!basicSearchOn"></time-tracker-nx-basic-filter>
        <time-tracker-nx-advanced-filter [hidden]="!advancedSearchOn"></time-tracker-nx-advanced-filter>
      </div>
      
    </mat-card>
  `,
  styles: [
    `
      mat-card {
        margin-bottom: 15px;
      }

      .buttons {
        display: flex;
        button {
          margin-right: 15px;
        }
      }
      .spacer {
        flex-grow: 1;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class FiltersComponent implements OnInit {
  @Input() defaultColumns!: Columns;
  public basicSearchOn = false;
  advancedSearchOn:boolean = false;
  
  constructor(private store: Store) {}

  ngOnInit(): void {}

  onClickBasicSearch(): void {
    this.basicSearchOn = !this.basicSearchOn;
    this.advancedSearchOn = false;

    this.store.dispatch(DashboardActions.setAdvancedSearch({advanced: false}));
  }

  onClickAdvancedSearch(): void {
    this.advancedSearchOn = !this.advancedSearchOn;
    this.basicSearchOn = false;

    this.store.dispatch(DashboardActions.setAdvancedSearch({advanced: true}));
  }
}
