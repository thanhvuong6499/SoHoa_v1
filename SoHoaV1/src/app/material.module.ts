import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, 
MatProgressBarModule,MatToolbarModule ,
MatProgressSpinnerModule, MatDatepickerModule,
MatNativeDateModule
} from '@angular/material';

@NgModule({
imports: [
    MatButtonModule,
    MatToolbarModule,
    MatInputModule, 
    MatProgressBarModule,
    MatCardModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule
],
exports: [MatButtonModule,
     MatToolbarModule,
     MatInputModule, 
    MatProgressBarModule,
    MatCardModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule
]

  })

   export class MaterialModule { }