import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Instance } from '@time-tracker/shared';
import { UpdateTokenDialogComponent } from '../update-token-dialog/update-token-dialog.component';

@Component({
  selector: 'time-tracker-nx-instance-table',
  templateUrl: './instance-table.component.html',
  styleUrls: ['./instance-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InstanceTableComponent implements OnInit {
  @Input() instances!: Instance[];

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  displayedColumns: string[] = [
    'url',
    'added',
    'actions',
  ];

  openUpdateTokenDialog(instance: Instance) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    dialogConfig.data = {
      instance,
    };

    this.dialog.open(UpdateTokenDialogComponent, dialogConfig);
  }
}
