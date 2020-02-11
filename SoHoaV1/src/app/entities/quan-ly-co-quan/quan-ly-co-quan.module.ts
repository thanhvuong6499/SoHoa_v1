import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuanLyCoQuanRoutingModule } from './quan-ly-co-quan-routing.module';
import { QuanLyCoQuanComponent } from './quan-ly-co-quan.component';
import { CoQuanDialogComponent } from './co-quan-dialog/co-quan-dialog.component';
import { CoQuanDetailComponent } from './co-quan-detail/co-quan-detail.component';
import { CoQuanDeleteComponent } from './co-quan-delete/co-quan-delete.component';
import { QuanLyCoQuanPopupService } from './quan-ly-co-quan-popup.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressSpinnerModule } from '@angular/material';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    QuanLyCoQuanComponent,
    CoQuanDialogComponent,
    CoQuanDetailComponent,
    CoQuanDeleteComponent,
  ],
  entryComponents: [
    QuanLyCoQuanComponent,
    CoQuanDeleteComponent,
    CoQuanDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    QuanLyCoQuanRoutingModule,
    HttpClientModule,
    MatSliderModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatAutocompleteModule
  ],
  providers:[
    QuanLyCoQuanPopupService,
  ]
})
export class QuanLyCoQuanModule { }
