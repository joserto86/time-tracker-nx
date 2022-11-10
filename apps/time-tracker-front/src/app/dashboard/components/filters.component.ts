import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'time-tracker-nx-filters',
  template: `
    <mat-card class="buttons">
      <button color="primary" mat-raised-button>SEARCH</button>
      <button color="primary" mat-raised-button>FILTERS</button>

      <span class="spacer"></span>

      <time-tracker-nx-columns-menu
        class="right"
      ></time-tracker-nx-columns-menu>
    </mat-card>
  `,
  styles: [
    `
      .buttons {
        display: flex;
        margin-bottom: 15px;
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
  constructor() {}

  ngOnInit(): void {}
}
