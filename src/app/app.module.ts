import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Ng2GraphComponent } from './shared/components/graphics/ng2-graph/ng2-graph.component';
import { HighChartComponent } from './shared/components/graphics/high-chart/high-chart.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HighChartComponent,
    Ng2GraphComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
