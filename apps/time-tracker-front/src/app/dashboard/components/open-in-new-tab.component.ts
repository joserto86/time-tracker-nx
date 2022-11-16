import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

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
      inline="true"
    ></mat-icon>
  </a>`,
  styles: [
    `
      .open-in-new {
        text-decoration: none;
        color: #3f51b5;
        border: none;
        outline: none;

        mat-icon {
          margin-left: 5px;
          font-size: 1rem;
          vertical-align: bottom;
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
