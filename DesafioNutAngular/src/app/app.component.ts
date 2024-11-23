import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WebSocketService } from './Service/WebSocketService';
import { Subscription } from 'rxjs';
import { NgIf } from '@angular/common';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { MetricsViewComponent } from "./components/metrics-view/metrics-view.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, MetricsViewComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  socketCliente :any = null;

  metrics: any = null;
  metricsCPU: any = null;
  metricsMemory: any = null;
  metricsLatency: any = null;

  ngOnInit(): void {
    let ws = new SockJS('http://localhost:8080/metrics-websocket');
    this.socketCliente = Stomp.over(ws);
    console.log(this.socketCliente);
    this.socketCliente.connect({}, (frame: string) => {
      this.socketCliente.subscribe('/topic/metrics', (message: { body: string; }) => {
        console.log('Message: ' + message.body);
        this.metrics = JSON.parse(message.body);
        if(this.metrics.name.includes("CPU")){
          this.metricsCPU = this.metrics;
        }
        else if(this.metrics.name.includes("Memory")){
          this.metricsMemory = this.metrics;
        }
        else{
          this.metricsLatency = this.metrics;
        }
      });
    });


  }

  // metrics: any = null;
  // private subscription: Subscription | null = null;

  // constructor(private webSocketService: WebSocketService) {}

  // ngOnInit(): void {
  //   // Conecta ao WebSocket e subscreve às métricas
  //   this.webSocketService.connect();
  //   this.subscription = this.webSocketService.metrics$.subscribe((data) => {
  //     if (data) {
  //       this.metrics = data;
  //     }
  //   });
  // }




}
