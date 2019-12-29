import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuanLyHoSoComponent } from './quan-ly-ho-so.component';


const routes: Routes = [
  {
    path: "",
      data: {
          title: "Quản lý hồ sơ"
      },
      children: [
          {
              path: 'hoSo',
              data: {
                  title: "Hồ sơ"
              },
              component: QuanLyHoSoComponent
          },
          
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuanLyHoSoRoutingModule { }
