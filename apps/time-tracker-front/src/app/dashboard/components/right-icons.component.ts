import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { DefaultView } from '@time-tracker/shared';
import { setView } from '../state/actions/dashboard-actions';

@Component({
  selector: 'time-tracker-nx-right-icons',
  template: `
    <div class="right-icons">
      <ng-container *ngIf="view !== 'monthly'">
        <mat-icon
          matTooltipPosition="above"
          matTooltip="Date Filter"
          [matMenuTriggerFor]="menu"
          #menuTrigger
          >date_range</mat-icon
        >
      </ng-container>
      <mat-icon
        (click)="changeView('monthly')"
        matTooltipPosition="above"
        matTooltip="Monthly view"
        >calendar_today</mat-icon
      >

      <mat-icon
        (click)="changeView('weekly')"
        matTooltipPosition="above"
        matTooltip="Weekly view"
        >view_week</mat-icon
      >
      <mat-menu #menu="matMenu">
        <time-tracker-nx-date-filter
          class="date-fitler"
        ></time-tracker-nx-date-filter>
      </mat-menu>
    </div>
  `,
  styles: [
    `
      div.right-icons {
        margin: 10px;
        display: flex;
        flex-direction: row;
        justify-content: flex-end;

        mat-icon {
          margin-left: 10px;
          cursor: pointer;
        }
      }

      .date-fitler {
        width: 200px;
        min-height: 80px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RightIconsComponent {
  @Input() view!: DefaultView;

  constructor(private store: Store) {}

  changeView(view: DefaultView): void {
    console.log(view);
    this.store.dispatch(setView({ view }));
  }
}
