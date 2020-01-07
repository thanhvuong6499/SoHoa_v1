import { Component, OnInit, OnDestroy } from '@angular/core';
import { User, users } from '../../model/user.model';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html',
  styleUrls: ["login.component.css"]
})
export class LoginComponent implements OnInit, OnDestroy {
  public user : User = new User();
  constructor(private authenticationService : AuthenticationService, private router : Router) 
  {}
  
  ngOnInit(): void {
    
  } 

  onSubmit(event) {
    var result : User = this.authenticationService.login(this.user.username, this.user.password);
    console.log(result);
    if (result) {
      this.router.navigate(['/']);
    }
  }

  ngOnDestroy(): void {
    
  }
}
