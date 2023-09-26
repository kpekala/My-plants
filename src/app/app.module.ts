import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FindPlantsComponent } from './layout/find/species.component';
import { PlantComponent } from './layout/find/plant/plant.component';
import { LayoutComponent } from './layout/layout.component';
import {HomeComponent} from "./layout/home/home.component";
import {NavigationComponent} from "./layout/navigation/navigation.component";
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PlantModalComponent } from './layout/find/plant-modal/plant-modal.component';
import { ProfileComponent } from './layout/home/profile/profile.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { AlertComponent } from './shared/alert/alert.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    FindPlantsComponent,
    PlantComponent,
    LayoutComponent,
    AuthComponent,
    LoginComponent,
    PlantModalComponent,
    ProfileComponent,
    SpinnerComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
