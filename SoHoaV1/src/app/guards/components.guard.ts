import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ComponentsGuard implements CanActivate {
  constructor(private router : Router, private authentication : AuthenticationService) 
  {}
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    var role = localStorage.getItem('role');
    if (role === 'user') {
      this.router.navigate(['/404'], { queryParams: { role: 'access-denied' } });
      return false;
    }
    return true;
  }
  
}
