import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';

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
    this.getToken().subscribe(data => {
      if(!data){
        console.log('Invalid credentials!');
        this.msg = 'Invalid credentials!';
        return;
      }
      localStorage.setItem('token', data.token);
      console.log(localStorage.getItem('token'));

      this.router.navigate(['/', 'metrics']);
    });
  }

  getToken():Observable<any>{
    console.log(this.login);
    console.log(this.password);
    return this.httpCliente.post(this.url, {login: this.login, password: this.password});
  }
}
