import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './compoonents/dashboard/dashboard.component';
import { RegisterComponent } from './compoonents/register/register.component';
import { LoginComponent } from './compoonents/login/login.component';
import { Page1Component } from './compoonents/page1/page1.component';
import { Page2Component } from './compoonents/page2/page2.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'page1', pathMatch: 'full' },
      { path: 'page1', component: Page1Component },
      { path: 'page2', component: Page2Component },
    ],
  },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
