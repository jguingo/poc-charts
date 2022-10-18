import { Injectable } from '@angular/core';
import { Options } from 'highcharts';
import { IGraphiqueService } from '../interfaces/igraphique-service';
import { IQuestion } from '../interfaces/question';
import { GraphiqueService } from '../models/question-service';

@Injectable({
  providedIn: 'root'
})
export class HighChartGraphiqueService extends GraphiqueService implements IGraphiqueService {
  constructor() {
    super();
  }
  getModeleChartOptions(question: IQuestion, total: number): Options {
    const height = question.reponses.length * 90;
    return {
      boost: {
        enabled: true
      }, 
      accessibility: {
        enabled: true
      },
      credits: {
        enabled: false
      },
      legend: {
        enabled: false
      },
      chart: {
        plotShadow: false,
        height: height,
      },
      title: {
        text: ''
      },
      subtitle: {
        text: ''
      },
      xAxis: {
        height: 225,
        categories: this.getLabel(question.reponses), // Mes réponses
        title: {
          text: null
        },
        labels: {
          align: 'center'
        }
      },
      yAxis: {
        title: {
          text:''
        }
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.y:.1f}</b>'
      },
      plotOptions: {
        bar: {
          colorByPoint: true,
          colors: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(54, 162, 235, 1)"],
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format:/*<b>{series.name}</b>:*/ `{point.y}/${total} = {point.percent:.1f} %`,
            style: {
              color: 'black'
            }
          }
        }
      }
    };
  }

  transform(data: IQuestion): any {
    const total = this.getTotal(data.reponses);
    const optionsChemins = this.getModeleChartOptions(data, total);
    const chartOptions = {
      ...optionsChemins, ...{
        series: this.getSeries(data, total)
      }
    };

    return chartOptions;
  }

  getSeries(data: IQuestion, total : number) : any[] {
    return [{
      name: data.title,
      colorKey: 'colorValue',
      data: this.getData(data, total),
      type: 'bar',
      pointWidth: 50
    }]
  }

  getData(question: IQuestion, total: number): any[] {
    const results = question.reponses.map(r => this.createData(r.count, total));
    return results;
  }

  createData(value: number, total: number): any {
    return { y: value, percent: this.getPercent(value, total) };
  }

  getPercent(value: number, total: number) {
    return value / total * 100;
  }
}
