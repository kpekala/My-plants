import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { FindPlantsComponent } from './layout/find/find-plants.component';
import {LayoutComponent} from "./layout/layout.component";
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './auth/auth-guard.service';

const routes: Routes = [

  {path: '', redirectTo: 'app/home', pathMatch: 'full'},
  {
	path: 'app',
	component: LayoutComponent,
	canActivate: [authGuard],
	children: [
		{path: '', pathMatch: 'full', redirectTo: 'home'},
		{path: 'home', component: HomeComponent},
		{path: 'find', component: FindPlantsComponent}
	]
  },
  {
	path: 'auth',
	component: AuthComponent,
	children: [
		{path: '', pathMatch: 'full', redirectTo: 'login'},
		{path: 'login', component: LoginComponent}
	]
  },
  {path: '**', redirectTo: 'auth'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
