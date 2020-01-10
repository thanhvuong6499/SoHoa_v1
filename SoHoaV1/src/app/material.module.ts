import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, 
MatProgressBarModule,MatToolbarModule ,
MatProgressSpinnerModule} from '@angular/material';

@NgModule({
imports: [MatButtonModule, MatToolbarModule, MatInputModule, 
 MatProgressBarModule, MatCardModule, MatFormFieldModule,
 MatProgressSpinnerModule],
exports: [MatButtonModule, MatToolbarModule, MatInputModule, 
 MatProgressBarModule, MatCardModule, MatFormFieldModule,
 MatProgressSpinnerModule]

  })

   export class MaterialModule { }