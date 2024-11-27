import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,RouterLink,RouterOutlet],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  constructor(public httpCliente:HttpClient,private router:Router) { }
  ngOnInit(): void {
    localStorage.setItem('token', '');
    }

  public url:string='http://localhost:8080/login';
  public login:string='';
  public password:string='';

  public msg:string='';

  generateToken(){

      this.getToken().pipe(
        catchError(error => {
          console.log('Invalid credentials!');
          this.msg = 'Invalid credentials!';
          return of(null);
        }
      ))
      .subscribe(data => {
        localStorage.setItem('token', data.token);

        this.router.navigate(['/', 'metrics']);
      });



  }

  getToken():Observable<any>{

    return this.httpCliente.get(this.url, {
      headers: new HttpHeaders({
        'Authorization': `Basic ${btoa(this.login + ':' + this.password)}`
      })
    });
  }
}
