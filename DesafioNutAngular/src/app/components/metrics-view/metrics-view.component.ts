import { NgClass } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import Chart, { registerables, ChartConfiguration } from 'chart.js/auto';

Chart.register(...registerables);
@Component({
  selector: 'app-metrics-view',
  standalone: true,
  imports: [NgClass],
  templateUrl: './metrics-view.component.html',
  styleUrl: './metrics-view.component.css'
})
export class MetricsViewComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    if(this.metricsCPU.value>80){
      this.cpuStatus = "danger";
    }
    else{
      this.cpuStatus = "success";
    }
    if(this.metricsMemory.value>80){
      this.memoryStatus = "danger";
    }
    else{
      this.memoryStatus = "success";
    }
    if(this.metricsLatency.value>200){
      this.latencyStatus = "danger";
    }
    else{
      this.latencyStatus = "success";
    }
  }
  public cpuStatus: any = "success";
  public memoryStatus: any = "success";
  public latencyStatus: any = "success";
  @Input() public metricsCPU: any=0;
  @Input() public metricsMemory: any=0;
  @Input() public metricsLatency: any=0;



}


