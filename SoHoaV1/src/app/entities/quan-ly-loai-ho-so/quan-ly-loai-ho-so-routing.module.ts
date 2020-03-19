import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuanLyLoaiHoSoComponent } from './quan-ly-loai-ho-so.component';


const routes: Routes = [
  {
    path: "",
      data: {
          title: "Quản lý loại văn bản"
      },
      children: [
          {
              path: 'loaiHoSo',
              data: {
                  title: "Loại văn bản"
              },
              component: QuanLyLoaiHoSoComponent
          },
          
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuanLyLoaiHoSoRoutingModule { }
