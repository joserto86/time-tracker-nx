import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'time-tracker-nx-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
