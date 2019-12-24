import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuanLyPhongComponent } from './quan-ly-phong.component';
import { PhongPopupComponent } from './phong-dialog/phong-dialog.component';

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
  
    {
        path: 'phong-new',
        component: PhongPopupComponent,
        
        outlet: 'popup'
    },
    {
        path: 'phong/:id/edit',
        component: PhongPopupComponent,
        outlet: 'popup'
    },
]
// @NgModule({
//   imports: [RouterModule.forChild(ENTITY_STATES)],
//   exports: [RouterModule]
// })
// export class QuanLyPhongRoutingModule { }
