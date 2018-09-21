import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CustomMaterialModule } from './shared/moduls/material.module';
import { AppComponent } from './app.component';
import { DataComponent } from './layout/data/data.component';
import { DataDetailsComponent } from './layout/data-details/data-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {DataService}from './shared/services/data.service';
import { MonitorComponent } from './layout/monitor/monitor.component';
import { LayoutComponent } from './layout/layout.component';
import { AnalysisComponent } from './layout/analysis/analysis.component'
import { AppRoutingModule } from "./app-routing.module";

@NgModule({
  declarations: [
    AppComponent,
    DataComponent,
    DataDetailsComponent,
    MonitorComponent,
    LayoutComponent,
    AnalysisComponent
  ],
  entryComponents: [
    DataDetailsComponent
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    BrowserModule,
    CustomMaterialModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
