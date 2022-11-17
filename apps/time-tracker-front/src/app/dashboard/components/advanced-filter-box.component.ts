import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiFilter } from '@time-tracker/shared';

@Component({
  selector: 'time-tracker-nx-advanced-filter-box',
  template: `
    <mat-card>
      <mat-card-content> {{ filter.field }} {{ filter.method }} {{ filter.value }}</mat-card-content>
      <mat-icon (click)="store()" inline="true">bookmark</mat-icon>
      <mat-icon (click)="remove()" inline="true">cancel</mat-icon>
    </mat-card>
  `,
  styles: [`
    
    mat-card {
      padding: 5px;
      color: #3F51B5;
      background: #E3F2FD;
      margin-right: 5px;
      font-size: 13px;
      border: 1px solid #3F51B5;
      display: flex;
      align-items: center;

      mat-card-content {
        margin: 0;
      }

      mat-card-content {
        margin-right: 2rem;
      }

      mat-icon {
        background: #E3F2FD;
        color: #3F51B5;
        font-size: 1rem;
        padding: 3px;
      }
    }

  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdvancedFilterBoxComponent implements OnInit {

  @Input() filter!:ApiFilter;
  @Input() index!:number;

  @Output() deleteFilter = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  remove() {
    this.deleteFilter.emit(this.index);
  }

  store() {
    
  }
}
