import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/AuthService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  //injection de depandance 
  constructor(private AUTH:AuthService,private router:Router){}
SIGNIN():void{
this.AUTH.doGoogleLogin().then(()=>{this.router.navigate(['/members'])})
}

}
