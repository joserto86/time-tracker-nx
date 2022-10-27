import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Filter } from '@time-tracker/shared';

@Component({
  selector: 'time-tracker-nx-filter-table',
  templateUrl: './filter-table.component.html',
  styleUrls: ['./filter-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FilterTableComponent implements OnInit {
  @Input() filters!: Filter[];

  displayedColumns: string[] = ['name', 'column','condition', 'searchTerm', 'actions'];

  constructor() {}

  ngOnInit(): void {}
}
