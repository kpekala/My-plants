import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './layout/home/home.component';
import { FindPlantsComponent } from './layout/find/find-plants.component';
import {LayoutComponent} from "./layout/layout.component";

const routes: Routes = [

  {path: '', redirectTo: 'app/home', pathMatch: 'full'},
    {
        path: 'app',
        component: LayoutComponent,
        children: [
            {path: 'home', component: HomeComponent},
            {path: 'find', component: FindPlantsComponent}
        ]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
