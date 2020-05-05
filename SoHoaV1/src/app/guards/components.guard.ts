import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { UserGroupService } from '../entities/quan-ly-nhom-nguoi-dung/user-group.service';

@Injectable({
  providedIn: 'root'
})
export class ComponentsGuard implements CanActivate {
  roleName : string;
  userName: string;
  constructor(private router : Router, private authentication : AuthenticationService, private userGroupService : UserGroupService) 
  {  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    var urlRedirect = state.url;
    var userNavItems = ['/QuanLyTaiLieu/taiLieu','/HopSo/quanLyHopSo','/QuanLyHoSo/hoSo'];
    this.getRoleName();
    if(this.roleName != undefined){
      if (this.roleName.toLowerCase() === 'user') {
        if(!userNavItems.includes(urlRedirect)){
          // this.router.navigate([this.router.url]);
          this.router.navigate(['/404'], { queryParams: { role: 'access-denied' } });
          return false;
        }
      }
    }
    return true;
  }

  getRoleName () {
    var userName =  localStorage.getItem('user');
    this.userGroupService.getRoleName(userName)
    .subscribe((result) => {
        this.roleName = result.item.roleName;
    }, 
    (error => {
      setTimeout(() => {
      }, 5000);
    }),
    () => {
    })
  }
}
