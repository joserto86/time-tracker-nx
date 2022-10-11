import { Component, OnInit, ViewEncapsulation } from '@angular/core';

/* eslint-disable */

@Component({
  selector: 'time-tracker-nx-nx-welcome',
  template: `
   <mat-toolbar color="primary">
  <mat-toolbar-row class="container">
    <span>TimeTracker test</span>
    <span class="spacer"></span>
    <button mat-icon-button class="example-icon" aria-label="Example icon-button with menu icon">
      <mat-icon>menu</mat-icon>
    </button>
  </mat-toolbar-row>
</mat-toolbar>
  `,
  styles: [],
  encapsulation: ViewEncapsulation.None,
})
export class NxWelcomeComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
