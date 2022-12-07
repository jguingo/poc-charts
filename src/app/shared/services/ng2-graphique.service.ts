import { Injectable } from '@angular/core';
import {  ChartConfiguration , Plugin } from 'chart.js';
import { IQuestion } from '../interfaces/question';
import { GraphiqueService } from '../models/question-service';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
export interface INg2ChartConfig
{
  barChartData : ChartConfiguration<'bar'>['data'],
  barChartOptions : ChartConfiguration<'bar'>['options'],
  barChartPlugins : Plugin[]
}

@Injectable({
  providedIn: 'root'
})
export class Ng2GraphiqueService extends GraphiqueService {

  constructor() {
    super();
  }

  transform(data: IQuestion): INg2ChartConfig {
    const result :INg2ChartConfig  = {
        barChartData: this.getBarData(data),
        barChartOptions: this.getBarChartOptions(),
        barChartPlugins : [DataLabelsPlugin]
      };

    return result;
  }

  getBarData(data: IQuestion):  ChartConfiguration<'bar'>['data'] {
    return {
      labels: this.getLabel(data.reponses),
      datasets: [
        {
          data: this.getValues(data.reponses),
          label: data.title,
          backgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)'
          ]
        }
      ],

    };
  }

  getBarChartOptions(): ChartConfiguration<'bar'>['options'] {
    return {
      responsive: true,
      indexAxis: 'y',
      plugins: {
        datalabels: {
          anchor: 'start',
          align: 'right',
          labels: {

            value: {
              formatter(value, context) {
                const total = context.dataset.data.reduce<number>((prev, current) => { return (prev as number) + (current as number) }, 0);
                return `${value}/${total} = ${(value / total * 100).toFixed(2)} %`;
              },
              color: "back",
              textStrokeColor: 'white',
              textStrokeWidth: 2,
              font: {
                weight: 'bold'
              }
            }
          }
        }
      }
    };
  }
}
