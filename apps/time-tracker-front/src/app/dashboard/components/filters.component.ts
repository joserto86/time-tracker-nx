import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'time-tracker-nx-filters',
  template: `
    <mat-card>
      <button color="primary" mat-raised-button>SEARCH</button>
      <button color="primary" mat-raised-button>FILTERS</button>
      <button color="primary" class="right" mat-raised-button>COLUMNS</button>
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

  constructor() { }

  ngOnInit(): void {
  }

}
