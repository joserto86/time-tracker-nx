import { NativeDateAdapter } from '@angular/material/core';

export class CustomDateApapter extends NativeDateAdapter{
  override getFirstDayOfWeek(): number {
    return 1;
  }
}
