import { NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-metrics-logs',
  standalone: true,
  imports: [NgIf],
  templateUrl: './metrics-logs.component.html',
  styleUrl: './metrics-logs.component.css'
})
export class MetricsLogsComponent implements OnInit {
  ngOnInit(): void {
    console.log('MetricsLogsComponent initialized');
  }
  @Input() metricName: string='';
  @Input() metricValue: number=0;
  public date:Date = new Date();


}
