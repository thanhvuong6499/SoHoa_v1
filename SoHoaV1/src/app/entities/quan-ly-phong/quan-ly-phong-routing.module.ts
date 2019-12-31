import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuanLyPhongComponent } from './quan-ly-phong.component';

 export const quanLyPhongRoutes: Routes = [
  { 
      
      path: "",
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
          },
          
      ]
  },
];
 export const phongPopupRoute : Routes = [
  
]
// @NgModule({
//   imports: [RouterModule.forChild(ENTITY_STATES)],
//   exports: [RouterModule]
// })
// export class QuanLyPhongRoutingModule { }
