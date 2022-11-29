import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Store } from '@ngrx/store';
import { DatesService } from '../../shared/services/dates.service';
import { DashboardActions } from '../state/actions';

@Component({
  selector: 'time-tracker-nx-dashboard-paginator',
  template: `
    <div class="paginator">
      <mat-paginator
        #paginator
        style="display: none;"
        [hidePageSize]="true"
        [pageIndex]="1"
        [length]="3"
        [pageSize]="1"
        [showFirstLastButtons]="false"
        (page)="emitUpdatePage($event)"
      ></mat-paginator>
      <div class="buttons">
        <button
          color="primary"
          mat-mini-fab
          matTooltip="Previous Week"
          (click)="paginator.previousPage()"
        >
          <mat-icon>keyboard_arrow_left</mat-icon>
        </button>
        <span
          >{{ daysRange[0] | date: 'd LLL YY' }} -
          {{ daysRange[this.daysRange.length - 1] | date: 'd LLL YY' }}</span
        >
        <button
          color="primary"
          mat-mini-fab
          matTooltip="Next Week"
          [disabled]="disableNext()"
          (click)="paginator.nextPage()"
        >
          <mat-icon>keyboard_arrow_right</mat-icon>
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .paginator {
        display: flex;
        flex-direction: row-reverse;
      }

      .buttons {
        display: flex;
        align-items: center;

        button {
          margin: 0 10px;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPaginatorComponent implements OnInit {
  @Input() daysRange!: string[];
  @ViewChild('paginator') paginator!: MatPaginator;

  constructor(private store: Store, private dateService: DatesService) {}

  ngOnInit(): void {}

  emitUpdatePage(ev: any): void {
    let first = null;
    let last = null;

    if (ev.pageIndex === 0) {
      last = new Date(this.daysRange[0]);
      last.setDate(last.getDate() - 1);
      first = new Date(last);
      first.setDate(last.getDate() - 6);
    } else {
      first = new Date(this.daysRange[this.daysRange.length - 1]);
      first.setDate(first.getDate() + 1);
      last = new Date(first);
      last.setDate(first.getDate() + 6);
    }

    let filters = this.dateService.getDaysFilters(first, last);
    this.store.dispatch(DashboardActions.setDateFilters({ filters }));
    this.store.dispatch(DashboardActions.loadTimeNotes());

    this.paginator.pageIndex = 1;
  }

  disableNext() {
    const today = new Date();
    const next = new Date(this.daysRange[this.daysRange.length - 1]);

    if (next >= today) {
      return true;
    }

    return false;
  }
}
