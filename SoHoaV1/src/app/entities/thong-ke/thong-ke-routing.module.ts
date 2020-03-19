import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ThongKeComponent } from './thong-ke/thong-ke.component';
import { NhatKyComponent } from './nhat-ky/nhat-ky.component';



const routes: Routes = [
  {
    path: "",
      data: {
          title: "Thống kê"
      },
      children: [
          {
              path: 'thongKe',
              data: {
                  title: "Thống kê"
              },
              component: ThongKeComponent
          },
          {
            path: 'nhatKy',
            component: NhatKyComponent,
            data: {
              title: "Nhật ký"
            }
          }
          
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThongKeRoutingModule { }
