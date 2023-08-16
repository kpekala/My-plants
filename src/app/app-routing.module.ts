import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { FindPlantsComponent } from './layout/find/find-plants.component';
import {LayoutComponent} from "./layout/layout.component";
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { homeGuard } from './layout/home/home-guard';
import { RegisterComponent } from './auth/register/register.component';
import { authGuard } from './auth/auth-guard';

const routes: Routes = [

  {path: '', redirectTo: 'app/home', pathMatch: 'full'},
  {
	path: 'app',
	component: LayoutComponent,
	canActivate: [homeGuard],
	children: [
		{path: '', pathMatch: 'full', redirectTo: 'home'},
		{path: 'home', component: HomeComponent},
		{path: 'find', component: FindPlantsComponent}
	]
  },
  {
	path: 'auth',
	component: AuthComponent,
	canActivate: [authGuard],
	children: [
		{path: 'login', component: LoginComponent},
		{path: 'register', component: RegisterComponent},
		{path: '', pathMatch: 'full', redirectTo: 'login'}
	]
  },
  {path: '**', redirectTo: 'auth'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
