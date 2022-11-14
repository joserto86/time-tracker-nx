import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Columns } from '@time-tracker/shared';

@Component({
  selector: 'time-tracker-nx-filters',
  template: `
     <mat-card>
      <div class="buttons">
        <button color="primary" mat-raised-button (click)="onClickBasicSearch()">
          SEARCH
        </button>
        <button color="primary" mat-raised-button>FILTERS</button>
        
        <span class="spacer"></span>
  
        <time-tracker-nx-columns-menu
          [defaultColumns]="defaultColumns"
          class="right"
        ></time-tracker-nx-columns-menu>
      </div>
     
      <div>
        <time-tracker-nx-basic-filter [hidden]="!basicSearchOn"></time-tracker-nx-basic-filter>
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersComponent implements OnInit {
  @Input() defaultColumns!: Columns;
  public basicSearchOn = false;
  constructor() {}

  ngOnInit(): void {}

  onClickBasicSearch(): void {
    this.basicSearchOn = !this.basicSearchOn;
  }
}
