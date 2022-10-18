import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'time-tracker-nx-my-filters-page',
  templateUrl: './my-filters-page.component.html',
  styleUrls: ['./my-filters-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyFiltersPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
