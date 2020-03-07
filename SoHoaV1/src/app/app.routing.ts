import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { QuanLyDanhMucComponent } from './entities/quan-ly-danh-muc/quan-ly-danh-muc.component';
import { QuanLyNguoiDungComponent } from './entities/quan-ly-nguoi-dung/quan-ly-nguoi-dung.component';
import { AuthGuard } from './guards/auth.guard';
import { ComponentsGuard } from './guards/components.guard';

export const routes: Routes = [
/*   {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, */
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home',
    },
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [ComponentsGuard]
      },
      {
        path: 'HopSo',
        loadChildren: () => import('./entities/quan-ly-hop-so/quan-ly-hop-so.module').then(m => m.QuanLyHopSoModule),
        canActivate: [ComponentsGuard]
      },
      {
        path: 'QuanLyPhong',
        loadChildren: () => import('./entities/quan-ly-phong/quan-ly-phong.module').then(m => m.QuanLyPhongModule),
        canActivate: [ComponentsGuard]
      },
      {
        path: 'QuanLyDanhMuc',
        loadChildren: () => import('./entities/quan-ly-danh-muc/quan-ly-danh-muc.module').then(m => m.QuanLyDanhMucModule),
        canActivate: [ComponentsGuard]
      },
      {
        path: 'QuanLyNguoiDung',
        loadChildren: () => import('./entities/quan-ly-nguoi-dung/quan-ly-nguoi-dung.module').then(m => m.QuanLyNguoiDungModule),
        canActivate: [ComponentsGuard]
      },
      {
        path: 'QuanLyCoQuan',
        loadChildren: () => import('./entities/quan-ly-co-quan/quan-ly-co-quan.module').then(m => m.QuanLyCoQuanModule),
        canActivate: [ComponentsGuard]
      },
      {
        path: 'QuanLyHoSo',
        loadChildren: () => import('./entities/quan-ly-ho-so/quan-ly-ho-so.module').then(m => m.QuanLyHoSoModule),
        canActivate: [ComponentsGuard]
      },
      {
        path: 'QuanLyTaiLieu',
        loadChildren: () => import('./entities/quan-ly-tai-lieu/quan-ly-tai-lieu.module').then(m => m.QuanLyTaiLieuModule)
      },
      {
        path: 'ThongKe',
        loadChildren: () => import('./entities/thong-ke/thong-ke.module').then(m => m.ThongKeModule)
      }
      // {
      //   path: 'quanLyHopSo',
      //   component: QuanLyHopSoComponent,
      // },
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
