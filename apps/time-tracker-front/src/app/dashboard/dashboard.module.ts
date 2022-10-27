import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './pages/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DashboardEffects } from './effects/dashboard.effects';
import * as fromDashboard from './reducers';
import { HttpClient } from '@angular/common/http';
import { DashbordService } from './services/dashboard.service';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    StoreModule.forFeature({
      name: fromDashboard.dashboardFeatureKey,
      reducer: fromDashboard.reducers,
    }),
    EffectsModule.forFeature([DashboardEffects]),
  ],
})
export class DashboardModule {}
