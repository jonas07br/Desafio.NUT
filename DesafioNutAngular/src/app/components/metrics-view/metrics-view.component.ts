import { NgClass, NgFor, NgIf } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { Stomp } from '@stomp/stompjs';
import Chart, { registerables, ChartConfiguration } from 'chart.js/auto';
import SockJS from 'sockjs-client';
import { NavBarComponent } from "../nav-bar/nav-bar.component";
import { GraphicComponent } from "../graphic/graphic.component";
import { MetricsLogsComponent } from "../metrics-logs/metrics-logs.component";

export type metricsLog = {
  name:"CPU"|"Memory"|"Latency";
  value:number;
}

@Component({
  selector: 'app-metrics-view',
  standalone: true,
  imports: [NgClass, NgIf, NavBarComponent, GraphicComponent, NgFor, MetricsLogsComponent],
  templateUrl: './metrics-view.component.html',
  styleUrl: './metrics-view.component.css'
})
export class MetricsViewComponent implements OnInit {
  public CPULogs: metricsLog[] = [];
  public MemoryLogs: metricsLog[] = [];
  public LatencyLogs: metricsLog[] = [];

  constructor(private router:Router) { }

  public cpuStatus: any = "great";
  public memoryStatus: any = "great";
  public latencyStatus: any = "great";
  public metrics: any = null;

  private token:string|null='';
  private socketCliente:any=null;

  public metricsCPU: number=0;
  public metricsMemory: number=0;
  public metricsLatency: number=0;

  public tokenValid:boolean=false;


  ngOnInit(): void {
      let ws = new SockJS(`http://localhost:8080/metrics-websocket?auth-token=${localStorage.getItem('token')}`);
      this.socketCliente = Stomp.over(ws);
      this.token = localStorage.getItem('token');
      if(!this.token){
        console.log('Invalid token!');
        this.router.navigate(['/', 'login']);
        return;
      }

      this.socketCliente.connect({
        // headers: new HttpHeaders().set('Authorization', this.token)
        'auth-token': this.token
      }, (frame: string) => {
        this.socketCliente.subscribe('/topic/metrics', (message: { body: string; }) => {
          this.tokenValid = true;
          //console.log('Message: ' + message.body);
          this.metrics = JSON.parse(message.body);
          if(this.metrics.name.includes("CPU")){
            this.metricsCPU = this.metrics.value;
            if(this.metricsCPU>80){
              this.cpuStatus = "danger";
              this.CPULogs.push({name:"CPU",value:this.metricsCPU});
            }
            else{
              this.cpuStatus = "great";
            }
          }
          else if(this.metrics.name.includes("Memory")){
            this.metricsMemory = this.metrics.value;
            if(this.metricsMemory>75){
              this.memoryStatus = "danger";
              this.MemoryLogs.push({name:"Memory",value:this.metricsMemory});
            }
            else{
              this.memoryStatus = "great";
            }
          }
          else{
            this.metricsLatency = this.metrics.value;
            if(this.metricsLatency>200){
              this.latencyStatus = "danger";
              this.LatencyLogs.push({name:"Latency",value:this.metricsLatency});
            }
            else{
              this.latencyStatus = "great";
            }
          }
        });
      });
  }


}


