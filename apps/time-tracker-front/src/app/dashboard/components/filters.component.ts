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
    <mat-card class="buttons">
      <button color="primary" mat-raised-button>SEARCH</button>
      <button color="primary" mat-raised-button>FILTERS</button>

      <span class="spacer"></span>

      <time-tracker-nx-columns-menu
        [defaultColumns]="defaultColumns"
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
  @Input() defaultColumns!: Columns;

  constructor() {}

  ngOnInit(): void {}
}
