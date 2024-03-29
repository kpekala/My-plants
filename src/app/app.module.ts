import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpeciesComponent } from './layout/species/species.component';
import { PlantComponent } from './layout/species/plant/plant.component';
import { LayoutComponent } from './layout/layout.component';
import {HomeComponent} from "./layout/home/home.component";
import {NavigationComponent} from "./layout/navigation/navigation.component";
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PlantModalComponent } from './layout/species/plant-modal/plant-modal.component';
import { ProfileComponent } from './layout/home/profile/profile.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { AlertComponent } from './shared/alert/alert.component';
import { AddPlantComponent } from './layout/species/add-plant/add-plant.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    SpeciesComponent,
    PlantComponent,
    LayoutComponent,
    AuthComponent,
    LoginComponent,
    PlantModalComponent,
    ProfileComponent,
    SpinnerComponent,
    AlertComponent,
    AddPlantComponent
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
