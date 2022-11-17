import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'time-tracker-nx-right-icons',
  template: `
     <div class="right-icons">
      <mat-icon matTooltipPosition="left" matTooltip="Date Filter" [matMenuTriggerFor]="menu" #menuTrigger>date_range</mat-icon>
      <mat-menu #menu="matMenu">
        <time-tracker-nx-date-filter  class="date-fitler"></time-tracker-nx-date-filter>
      </mat-menu>
     </div>
  `,
  styles: [`

    div.right-icons {
      margin: 10px;
      display:flex;
      flex-direction: row-reverse;

      mat-icon {
        margin-left: 10px;
        cursor: pointer;
      }
    }

    .date-fitler {
      width: 200px;
      min-height: 80px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RightIconsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}
