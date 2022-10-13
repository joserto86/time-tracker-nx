import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/services';
import { DashboardComponent } from './pages/dashboard.component';

const routes: Routes = [
  { 
    path: 'dashboard',
    component: DashboardComponent,
    canLoad: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
