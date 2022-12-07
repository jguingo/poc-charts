import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgChartsModule } from 'ng2-charts';
import { map, Observable } from 'rxjs';
import { IGraphiqueComponent } from 'src/app/shared/interfaces/igraphique-component';
import { IQuestion } from 'src/app/shared/interfaces/question';
import { GraphiqueService } from 'src/app/shared/models/question-service';
import { INg2ChartConfig, Ng2GraphiqueService } from 'src/app/shared/services/ng2-graphique.service';
@Component({
  selector: 'app-ng2-graph',
  templateUrl: './ng2-graph.component.html',
  styleUrls: ['./ng2-graph.component.scss'],
  standalone: true,
  imports: [NgChartsModule, CommonModule],
  providers: [{
    provide: GraphiqueService,
    useClass: Ng2GraphiqueService
  }],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class Ng2GraphComponent implements OnInit, IGraphiqueComponent {

  public barChartLegend = false;
  public chartConfig: Observable<INg2ChartConfig> | null = null;
  constructor(private service: GraphiqueService) {
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.chartConfig = this.service.load()
      .pipe(
        map((data : IQuestion) => {
          return this.service.transform(data) as INg2ChartConfig;
        })
      );
  }
  //#endregion
}
