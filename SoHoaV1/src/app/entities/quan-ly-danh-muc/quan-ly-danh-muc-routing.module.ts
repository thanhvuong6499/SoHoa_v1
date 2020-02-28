import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuanLyDanhMucComponent } from './quan-ly-danh-muc.component';
import { DanhMucDetailComponent } from './danh-muc-detail/danh-muc-detail.component';


const routes: Routes = [
  {
    path: "",
      data: {
          title: "Quản lý danh mục"
      },
      children: [
          {
              path: 'danhMuc',
              data: {
                  title: "Danh mục"
              },
              component: QuanLyDanhMucComponent
          },
          {
            path: 'danhMuc/:id',
            component: DanhMucDetailComponent,
            data: {
              title: "Chi tiết danh mục"
            }
          }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuanLyDanhMucRoutingModule { }
