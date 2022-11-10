import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'time-tracker-nx-columns-menu',
  template: `
    <button
      color="primary"
      class="right"
      mat-raised-button
      [matMenuTriggerFor]="columnsMenu"
    >
      COLUMNS
    </button>
    <mat-menu #columnsMenu="matMenu">
      <div (click)="$event.stopPropagation()" class="menu-container">
        <mat-checkbox class="checkbox" formControlName="namespace"
          >namespace</mat-checkbox
        >
        <mat-checkbox class="checkbox" formControlName="name"
          >name</mat-checkbox
        >
        <mat-checkbox class="checkbox" formControlName="milestone"
          >milestone</mat-checkbox
        >
        <mat-checkbox class="checkbox" formControlName="issue"
          >issue</mat-checkbox
        >
        <mat-checkbox class="checkbox" formControlName="label"
          >label</mat-checkbox
        >
      </div>
    </mat-menu>
  `,
  styles: [
    `
      .menu-container {
        flex-direction: column;
        padding: 15px;
      }

      .checkbox {
        width: 100%;
        margin-bottom: 15px;
      }

      .checkbox:last-child() {
        border-color: green;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnsMenuComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
