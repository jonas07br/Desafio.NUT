import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { ApexOptions } from 'apexcharts';
import { ChartComponent, ApexChart, ApexAxisChartSeries, NgApexchartsModule, ApexYAxis ,ChartType} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries|any;
  chart: ApexChart|any;
  xaxis: ApexXAxis;

};

@Component({
  selector: 'app-graphic',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './graphic.component.html',
  styleUrl: './graphic.component.css'
})
export class GraphicComponent implements OnChanges {
  public chartOptions: Partial<ChartOptions>;
  @ViewChild('chart') chart!: ChartComponent;

  @Input() metrics:number=0;

  public metricsArray:number[] =[];

  constructor() {
    this.chartOptions = {

      series: [
        {
          name: "Métricas",
          data: []
        }
      ],
      chart:{
        type: "bar",
        // height:0, // Altura padrão em pixels
        toolbar: {
          show: false
        }
      },
      xaxis: {
        labels: {
          show: false // Oculta os rótulos no eixo X
        }
      }
    };
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.metricsArray.push(this.metrics);
    this.metricsArray = this.metricsArray.slice(-10);
    if (this.chart) {
      this.chart.updateSeries([
        {
          name: "Metrics",
          data: this.metricsArray
        }
      ]);
    }
  }


}
