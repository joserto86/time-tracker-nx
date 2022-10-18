import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'time-tracker-nx-credentials-page',
  templateUrl: './credentials-page.component.html',
  styleUrls: ['./credentials-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CredentialsPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
