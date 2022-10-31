import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Instance } from '@time-tracker/shared';

@Component({
  selector: 'time-tracker-nx-instance-table',
  templateUrl: './instance-table.component.html',
  styleUrls: ['./instance-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InstanceTableComponent implements OnInit {
  @Input() instances!: Instance[];

  constructor() {}

  ngOnInit(): void {}

  displayedColumns: string[] = [
    'url',
    'added',
    'actions',
  ];
}
