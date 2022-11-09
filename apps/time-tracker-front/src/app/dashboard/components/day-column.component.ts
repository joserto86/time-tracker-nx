import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { LocalIssue } from '@time-tracker/shared';

@Component({
  selector: 'time-tracker-nx-day-column',
  template: `
    <ng-container matColumnDef="{{ day }}">
      <th mat-header-cell *matHeaderCellDef> {{ day }} </th>
      <td mat-cell *matCellDef="let issue"> datos... </td>
  </ng-container>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DayColumnComponent implements OnInit {

  @Input() day:string = '';

  constructor() { }

  ngOnInit(): void {
  }
}
