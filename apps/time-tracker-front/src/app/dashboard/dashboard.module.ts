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
import { BasicFilterComponent } from './components/basic-filter.component';
import { FormsModule } from '@angular/forms';
import { ColumnsMenuComponent } from './components/columns-menu.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TrackerDetailInfoComponent } from './components/tracker-detail-info.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { AdvancedFilterComponent } from './components/advanced-filter.component';
import { OpenInNewTabComponent } from './components/open-in-new-tab.component';
import { AdvancedFilterBoxComponent } from './components/advanced-filter-box.component';
import { DateFilterComponent } from './components/date-filter.component';
import { RightIconsComponent } from './components/right-icons.component';
import { DashboardPaginatorComponent } from './components/dashboard-paginator.component';
import { DateAdapter } from '@angular/material/core';
import { CustomDateApapter } from './services/custom-date-adapter';
import { FiltersEffects } from '../settings/state/effects/filters.effects';

@NgModule({
  declarations: [
    DashboardComponent,
    IssueTableComponent,
    FiltersComponent,
    BasicFilterComponent,
    ColumnsMenuComponent,
    TrackerDetailInfoComponent,
    AdvancedFilterComponent,
    OpenInNewTabComponent,
    AdvancedFilterBoxComponent,
    DateFilterComponent,
    RightIconsComponent,
    DashboardPaginatorComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    MaterialModule,
    NgxSkeletonLoaderModule,
    ReactiveFormsModule,
    StoreModule.forFeature({
      name: fromDashboard.dashboardFeatureKey,
      reducer: fromDashboard.reducer,
    }),
    EffectsModule.forFeature([DashboardEffects]),
  ],
  providers: [
    { provide: DateAdapter, useClass: CustomDateApapter }
  ]
})
export class DashboardModule {}
