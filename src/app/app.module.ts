import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NewsComponent } from './news/news.component';
import { PrimaryChartComponent } from './primary-chart/primary-chart.component';
import { SecondaryChartComponent } from './secondary-chart/secondary-chart.component';
import { SecondaryChartContainerComponent } from './secondary-chart-container/secondary-chart-container.component';

PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SidebarComponent,
    NewsComponent,
    PrimaryChartComponent,
    SecondaryChartComponent,
    SecondaryChartContainerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PlotlyModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
