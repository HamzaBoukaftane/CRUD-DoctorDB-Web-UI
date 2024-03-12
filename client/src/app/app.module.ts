import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./modules/app-routing.module";
import { AppComponent } from "./app.component";
import { CommunicationService } from "./services/communication.service";
import { AppMaterialModule } from './modules/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DoctorsComponent } from './components/doctors/doctors.component';
import { DisplayPageComponent } from './page/display-page/display-page.component';
import { AddingPageComponent } from './page/adding-page/adding-page.component';
import { ModifyingPageComponent } from './page/modifying-page/modifying-page.component';
import { DeletingPageComponent } from './page/deleting-page/deleting-page.component';
import { FormComponent } from './components/form/form.component';
import { AlertWindowComponent } from './components/alert-window/alert-window.component';

@NgModule({
  declarations: [
    AppComponent,
    DoctorsComponent,
    DisplayPageComponent,
    AddingPageComponent,
    ModifyingPageComponent,
    DeletingPageComponent,
    FormComponent,
    AlertWindowComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppMaterialModule
  ],
  providers: [CommunicationService],
  bootstrap: [AppComponent],
})
export class AppModule { }
