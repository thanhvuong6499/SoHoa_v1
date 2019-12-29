import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuanLyTaiLieuComponent } from './quan-ly-tai-lieu.component';


const routes: Routes = [
  {
    path: "",
      data: {
          title: "Quản lý tài liệu"
      },
      children: [
          {
              path: 'taiLieu',
              data: {
                  title: "Tài Liệu"
              },
              component: QuanLyTaiLieuComponent
          },
          
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuanLyTaiLieuRoutingModule { }
