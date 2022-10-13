import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'time-tracker-nx-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

}
