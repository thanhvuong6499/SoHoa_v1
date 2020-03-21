import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ThongKeComponent } from './thong-ke/thong-ke.component';
import { NhatKyComponent } from './nhat-ky/nhat-ky.component';
import { ThongKeHopSoComponent} from './thong-ke-hop-so/thong-ke-hop-so.component';
import { ThongKeHoSoComponent } from './thong-ke-ho-so/thong-ke-ho-so.component';



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
          },
          {
            path: 'thongKeHopSo',
            data: {
                title: "Thống kê hộp số"
            },
            component: ThongKeHopSoComponent
          },
          {
            path: 'thongKeHoSo',
            data: {
                title: "Thống kê hồ số"
            },
            component: ThongKeHoSoComponent
          },
          
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThongKeRoutingModule { }
