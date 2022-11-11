import { ChangeDetectionStrategy, Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'time-tracker-nx-filters',
  template: `
    <mat-card>
      <button color="primary" mat-raised-button (click)="onClickBasicSearch()">
        SEARCH
      </button>
      <button color="primary" mat-raised-button>FILTERS</button>
      <button color="primary" class="right" mat-raised-button>COLUMNS</button>
      <time-tracker-nx-basic-filter [hidden]="!basicSearchOn"></time-tracker-nx-basic-filter>
    </mat-card>
  `,
  styles: [
    `
    button{
        &.right {
          float: right;
        }

      margin: 5px 15px; }
      mat-card {
        margin-bottom: 15px;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltersComponent implements OnInit {
  public basicSearchOn = false;
  constructor() {}

  ngOnInit(): void {}

  onClickBasicSearch(): void {
    this.basicSearchOn = !this.basicSearchOn;
  }

}
