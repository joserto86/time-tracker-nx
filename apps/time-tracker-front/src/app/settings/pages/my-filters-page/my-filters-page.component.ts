import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Filter } from '@time-tracker/shared';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'time-tracker-nx-my-filters-page',
  templateUrl: './my-filters-page.component.html',
  styleUrls: ['./my-filters-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyFiltersPageComponent implements OnInit {
  private filters = [
    {
      name: 'filter One',
      column: 'name',
      condition: 'is',
      searchTerm: 'My search term1',
    },
    {
      name: 'filter Two',
      column: 'name',
      condition: 'is',
      searchTerm: 'My search term2',
    },
    {
      name: 'filter Three',
      column: 'name',
      condition: 'is',
      searchTerm: 'My search term3',
    },
  ];

  filters$: Observable<Filter[]> = of(this.filters);

  constructor() {}

  ngOnInit(): void {}
}
