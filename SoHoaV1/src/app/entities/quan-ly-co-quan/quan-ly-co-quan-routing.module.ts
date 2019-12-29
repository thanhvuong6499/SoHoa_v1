import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuanLyCoQuanComponent } from './quan-ly-co-quan.component';


const routes: Routes = [
  {
    path: "",
      data: {
          title: "Quản lý cơ quan"
      },
      children: [
          {
              path: 'coQuan',
              data: {
                  title: "Cơ quan"
              },
              component: QuanLyCoQuanComponent
          },
          
      ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuanLyCoQuanRoutingModule { }
