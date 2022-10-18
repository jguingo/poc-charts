import { Component } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'poc-charts';
  //#region ng2-Chart
  public barChartLegend = false;
  public barChartPlugins = [DataLabelsPlugin];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Oui', 'Non'],
    datasets: [
      {
        data: [65, 35], label: 'Ma question',
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)'
        ]
      }
    ],

  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    indexAxis: 'y',
    plugins: {
      datalabels: {
        anchor: 'center',
        align: 'center',
        labels: {
          value: { 
            formatter(value, context) {
              return value+'/'+100
            }
          }
        }
      }
    }
  };
  //#endregion


  constructor() {
  }
}
