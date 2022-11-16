import {
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';

@Component({
  selector: 'time-tracker-nx-open-in-new-tab',
  template: ` <a
    [href]="url"
    target="_blank"
    rel="noopener noreferrer"
    class="open-in-new"
  >
    <mat-icon
      aria-hidden="false"
      aria-label="Open in new tab"
      fontIcon="open_in_new"
    ></mat-icon>
  </a>`,
  styles: [
    `
      .open-in-new {
        font-size: 1rem;
        display: inline-block;
        text-decoration: none;
        color: #3f51b5;
        justify-content: baseline;

        border: none;
        outline: none;

        mat-icon {
          font-size: 1rem;
          margin-bottom: -10px;
          margin-left: 5px;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpenInNewTabComponent {
  @Input() url: string = '';
  constructor() {}
}
