import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Instance } from '@time-tracker/shared';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'time-tracker-nx-credentials-page',
  templateUrl: './credentials-page.component.html',
  styleUrls: ['./credentials-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CredentialsPageComponent implements OnInit {
  instances$: Observable<Instance[]>;

  constructor() {
    this.instances$ = of([
      {
        id: 1,
        url: 'https://git.irontec.com',
        added: true,
      },
      {
        id: 2,
        url: 'https://gitlab.com',
        added: false,
      },
    ]);
  }

  ngOnInit(): void {}
}
