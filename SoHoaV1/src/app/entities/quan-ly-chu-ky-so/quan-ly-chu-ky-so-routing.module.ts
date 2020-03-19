import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuanLyChuKySoComponent } from './quan-ly-chu-ky-so/quan-ly-chu-ky-so.component';


const routes: Routes = [
  {
    path: "",
      data: {
          title: "Quản lý Chữ Ký Số"
      },
      children: [
          {
              path: 'chuKySo',
              data: {
                  title: "Chữ ký số"
              },
              component: QuanLyChuKySoComponent
          },
          
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuanLyChuKySoRoutingModule { }
