import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuanLyPhongComponent } from './quan-ly-phong.component';

const routes: Routes = [
  { 
      
      path: "",
      component: QuanLyPhongComponent,
      data: {
          title: "Phông"
      },
      children: [
          {
              path: 'phong',
              data: {
                  title: "Phông"
              },
              component: QuanLyPhongComponent
          }
      ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuanLyPhongRoutingModule { }
