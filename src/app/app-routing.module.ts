import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { DataComponent } from "./layout/data/data.component";
import { MonitorComponent } from "./layout/monitor/monitor.component";
import { AnalysisComponent } from "./layout/analysis/analysis.component";
import {LayoutComponent}from "./layout/layout.component"

const appRoutes: Routes = [
  { path: "", redirectTo: "/main/data", pathMatch: "full" },
  {
    path: 'main', component: LayoutComponent, children: [
      { path: '', redirectTo: '/main/data', pathMatch: 'full' },
      { path: "data", component: DataComponent },
      { path: "monitor", component: MonitorComponent },
      { path: "analysis", component: AnalysisComponent },
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]

})
export class AppRoutingModule { }
