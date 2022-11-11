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
import { FiltersComponent } from './components/filters.component';

import { ColumnsMenuComponent } from './components/columns-menu.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TrackerDetailInfoComponent } from './components/tracker-detail-info.component';

@NgModule({
  declarations: [
    DashboardComponent,
    IssueTableComponent,
    FiltersComponent,
    ColumnsMenuComponent,
    TrackerDetailInfoComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    StoreModule.forFeature({
      name: fromDashboard.dashboardFeatureKey,
      reducer: fromDashboard.reducer,
    }),
    EffectsModule.forFeature([DashboardEffects]),
  ],
})
export class DashboardModule {}
