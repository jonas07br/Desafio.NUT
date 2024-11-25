import { NgClass } from '@angular/common';
import { HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { Stomp } from '@stomp/stompjs';
import Chart, { registerables, ChartConfiguration } from 'chart.js/auto';
import SockJS from 'sockjs-client';

Chart.register(...registerables);
@Component({
  selector: 'app-metrics-view',
  standalone: true,
  imports: [NgClass],
  templateUrl: './metrics-view.component.html',
  styleUrl: './metrics-view.component.css'
})
export class MetricsViewComponent implements OnInit {
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


  ngOnInit(): void {
      console.log(localStorage.getItem('token'));
      let ws = new SockJS(`http://localhost:8080/metrics-websocket?auth-token=${localStorage.getItem('token')}`);
      this.socketCliente = Stomp.over(ws);
      console.log(this.socketCliente);
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

          //console.log('Message: ' + message.body);
          this.metrics = JSON.parse(message.body);
          if(this.metrics.name.includes("CPU")){
            this.metricsCPU = this.metrics.value;
            if(this.metricsCPU>80){
              this.cpuStatus = "danger";
            }
            else{
              this.cpuStatus = "great";
            }
          }
          else if(this.metrics.name.includes("Memory")){
            this.metricsMemory = this.metrics.value;
            if(this.metricsMemory>80){
              this.memoryStatus = "danger";
            }
            else{
              this.memoryStatus = "great";
            }
          }
          else{
            this.metricsLatency = this.metrics.value;
            if(this.metricsLatency>200){
              this.latencyStatus = "danger";
            }
            else{
              this.latencyStatus = "great";
            }
          }
        });
      });
  }


}


