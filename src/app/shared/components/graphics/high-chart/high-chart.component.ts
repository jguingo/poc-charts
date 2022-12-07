import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HighchartsChartModule } from 'highcharts-angular';
import { IQuestion } from 'src/app/shared/interfaces/question';
import { HighChartGraphiqueService } from 'src/app/shared/services/high-chart-graphique.service';
import { IGraphiqueComponent } from 'src/app/shared/interfaces/igraphique-component';
import { GraphiqueService } from 'src/app/shared/models/question-service';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-high-chart',
  templateUrl: './high-chart.component.html',
  styleUrls: ['./high-chart.component.scss'],
  standalone: true,
  imports: [HighchartsChartModule, CommonModule],
  providers : [{
    provide : GraphiqueService,
    useClass : HighChartGraphiqueService
  }],
  changeDetection : ChangeDetectionStrategy.OnPush
})
export class HighChartComponent implements OnInit, IGraphiqueComponent {

  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor: string = 'chart'; // optional string, defaults to 'chart'
  chartOptions: Observable<Highcharts.Options> | null = null;// {}; // required
  chartCallback: Highcharts.ChartCallbackFunction = function (chart) { } // optional function, defaults to null
  updateFlag: boolean = false; // optional boolean
  oneToOneFlag: boolean = true; // optional boolean, defaults to false
  runOutsideAngular: boolean = true; // optional boolean, defaults to false

  constructor(private service: GraphiqueService) {}

  ngOnInit(): void {
    this.loadData(); 
  }

  loadData() : void {
    this.chartOptions = this.service.load()
    .pipe(
      map((data : IQuestion ) => {
       return this.service.transform(data) as Highcharts.Options;})
    );
  }
}
