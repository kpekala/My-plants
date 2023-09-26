import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { FindPlantsComponent } from './layout/find/species.component';
import {LayoutComponent} from "./layout/layout.component";
import { AuthComponent } from './auth/auth.component';
import { homeGuard } from './layout/home/home-guard';
import { LoginComponent } from './auth/login/login.component';
import { authGuard } from './auth/auth-guard';
import { profileResolver } from './layout/home/profile/profile-resolver';

const routes: Routes = [

  {path: '', redirectTo: 'app/home', pathMatch: 'full'},
  {
	path: 'app',
	component: LayoutComponent,
	canActivate: [homeGuard],
	children: [
		{path: '', pathMatch: 'full', redirectTo: 'home'},
		{path: 'home', component: HomeComponent, resolve: [profileResolver]},
		{path: 'find', component: FindPlantsComponent}
	]
  },
  {
	path: 'auth',
	component: AuthComponent,
	canActivate: [authGuard],
	children: [
		{path: '', component: LoginComponent, data: {'isLoginView': true}}
	]
  },
  {path: '**', redirectTo: 'auth'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
