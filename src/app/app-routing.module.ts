import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { FindPlantsComponent } from './layout/find/find-plants.component';
import {LayoutComponent} from "./layout/layout.component";
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [

  {path: '', redirectTo: 'app/home', pathMatch: 'full'},
  {
	path: 'app',
	component: LayoutComponent,
	children: [
		{path: 'home', component: HomeComponent},
		{path: 'find', component: FindPlantsComponent}
	]
  },
  {
	path: 'auth',
	component: AuthComponent,
	children: [
		{path: 'login', component: LoginComponent}
	]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
