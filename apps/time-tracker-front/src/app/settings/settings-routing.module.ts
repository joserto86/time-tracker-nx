import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { MyFiltersPageComponent } from './pages/my-filters-page/my-filters-page.component';
import { CredentialsPageComponent } from './pages/credentials-page/credentials-page.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'profile',
        component: ProfilePageComponent,
      },
      {
        path: 'my-filters',
        component: MyFiltersPageComponent,
      },
      {
        path: 'credentials',
        component: CredentialsPageComponent,
      },
      {
        path: '**',
        redirectTo: 'profile',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsRoutingModule {}
