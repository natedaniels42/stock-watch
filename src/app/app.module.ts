import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NewsComponent } from './news/news.component';
import { PrimaryChartComponent } from './primary-chart/primary-chart.component';
import { SecondaryChartComponent } from './secondary-chart/secondary-chart.component';
import { SecondaryChartContainerComponent } from './secondary-chart-container/secondary-chart-container.component';
import { MatInputModule } from '@angular/material/input';

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
    HttpClientModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
