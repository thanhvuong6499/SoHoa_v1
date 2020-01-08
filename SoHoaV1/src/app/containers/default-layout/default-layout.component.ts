import {Component, OnDestroy, OnInit } from '@angular/core';
import { navItems } from '../../_nav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit, OnDestroy {
  public userName : string;
  constructor(private router : Router) 
  {
    this.userName = localStorage.getItem('user');
  }

  public sidebarMinimized = false;
  public userNavItems = [
    {
        name: 'Quản lý tài liệu',
        url: '/QuanLyTaiLieu/taiLieu',
        icon: 'fa fa-file-text'
    }
  ];
  public adminNavItems = navItems;
  public navItems = [];

  ngOnInit(): void {
    var role = localStorage.getItem('role');
    if (role === 'admin') {
      this.navItems = navItems;
    }
    else {
      this.navItems = this.userNavItems;
    }
  }

  logout() {
    if(confirm("Bạn có chắc muốn đăng xuất không ?")) {
      localStorage.clear();
      this.router.navigate(['/login'], { queryParams: { returnUrl: '/' } });
    }
    return;
  }
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  ngOnDestroy(): void {
    
  }
}
