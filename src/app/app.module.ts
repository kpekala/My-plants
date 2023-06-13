import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FindPlantsComponent } from './layout/find/find-plants.component';
import { PlantComponent } from './layout/find/plant/plant.component';
import { LayoutComponent } from './layout/layout.component';
import {HomeComponent} from "./layout/home/home.component";
import {NavigationComponent} from "./layout/navigation/navigation.component";
import { AuthComponent } from './auth/auth.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    FindPlantsComponent,
    PlantComponent,
    LayoutComponent,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
