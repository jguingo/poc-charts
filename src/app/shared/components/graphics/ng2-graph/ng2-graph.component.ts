import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { IGraphiqueComponent } from 'src/app/shared/interfaces/igraphique-component';
import { GraphiqueService } from 'src/app/shared/models/question-service';
import { INg2ChartConfig, Ng2GraphiqueService } from 'src/app/shared/services/ng2-graphique.service';
@Component({
  selector: 'app-ng2-graph',
  templateUrl: './ng2-graph.component.html',
  styleUrls: ['./ng2-graph.component.scss'],
  standalone: true,
  imports : [NgChartsModule],
  providers : [{
    provide : GraphiqueService,
    useClass : Ng2GraphiqueService
  }],
  changeDetection : ChangeDetectionStrategy.OnPush
})

export class Ng2GraphComponent implements OnInit, IGraphiqueComponent {

  public barChartLegend = false; 
  public chartConfig? : INg2ChartConfig; 

  constructor(private service : GraphiqueService) {
  }

  ngOnInit(): void {
    this.loadData();
  }
 
  loadData(): void {
    this.service.load().subscribe({
      next: (data) => {
        this.chartConfig = this.service.transform(data) as INg2ChartConfig;
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    })
  }
  //#endregion
}
