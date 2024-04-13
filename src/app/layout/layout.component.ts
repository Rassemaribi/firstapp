import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/AuthService';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {
  user !:any;
  constructor(private AUTH: AuthService, private router: Router) {
     //recuperation user name et circle account
    this.AUTH.getUserClaims().then((u)=>{
      this.user=u;
      if(!!this.user)console.log(this.user.displayName)
    })
  }

  logout(): void {
    this.AUTH.doLogout().then(() => {
      this.router.navigate(['/login']);
    });
  }

 
 
  
}
