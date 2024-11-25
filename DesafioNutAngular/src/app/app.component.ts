import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WebSocketService } from './Service/WebSocketService';
import { generate, Observable, Subscription } from 'rxjs';
import { NgIf } from '@angular/common';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MetricsViewComponent } from "./components/metrics-view/metrics-view.component";
import {FormsModule} from '@angular/forms';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgIf, MetricsViewComponent,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  constructor(private httpCliente:HttpClient) { }

  private url = 'http://localhost:8080/login';

  socketCliente :any = null;

  metrics: any = null;
  metricsCPU: any = null;
  metricsMemory: any = null;
  metricsLatency: any = null;

  public login:string = '';
  public password:string = '';

  user: any = '';
  token: any = '';

  generateToken(){
    this.getToken().subscribe(data => {
      localStorage.setItem('token', this.token);
    });
  }

  getToken():Observable<any>{
    console.log(this.login);
    console.log(this.password);
    return this.httpCliente.post(this.url, {login: this.login, password: this.password});
  }
  testToken(){
    return this.httpCliente.get('http://localhost:8080/teste',{
      headers: new HttpHeaders().set('Authorization', this.token)}).subscribe(data => {
        console.log(data)});
  }
  ngOnInit(): void {
    
  }
  connect(){

      console.log(localStorage.getItem('token'));
      let ws = new SockJS('http://localhost:8080/metrics-websocket');
      this.socketCliente = Stomp.over(ws);

      this.token = localStorage.getItem('token');
      this.socketCliente.connect({
        headers: new HttpHeaders().set('Authorization', this.token)
      }, (frame: string) => {
        this.socketCliente.subscribe('/topic/metrics', (message: { body: string; }) => {

          //console.log('Message: ' + message.body);
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
