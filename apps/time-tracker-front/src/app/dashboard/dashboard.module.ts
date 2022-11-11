import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DashboardEffects } from './state/effects/dashboard.effects';
import * as fromDashboard from './state/reducers/dashboard.reducer';
import { IssueTableComponent } from './components/issue-table/issue-table.component';
import { MaterialModule } from '../material/material.module';
import { DayColumnComponent } from './components/day-column.component';
import { FiltersComponent } from './components/filters.component';
import { BasicFilterComponent } from './components/basic-filter.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
    IssueTableComponent,
    DayColumnComponent,
    FiltersComponent,
    BasicFilterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    MaterialModule,
    StoreModule.forFeature({
      name: fromDashboard.dashboardFeatureKey,
      reducer: fromDashboard.reducer,
    }),
    EffectsModule.forFeature([DashboardEffects]),
  ],
})
export class DashboardModule {}
