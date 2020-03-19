import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuanLyLoaiVanBanComponent } from './quan-ly-loai-van-ban.component';


const routes: Routes = [
  {
    path: "",
      data: {
          title: "Quản lý loại văn bản"
      },
      children: [
          {
              path: 'loaiVanBan',
              data: {
                  title: "Loại văn bản"
              },
              component: QuanLyLoaiVanBanComponent
          },
          
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuanLyLoaiVanBanRoutingModule { }
