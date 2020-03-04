import { Component, OnInit } from '@angular/core';
import { HoSo } from '../../model/ho-so.model';
import { hosos } from '../../model/ho-so.model';
import { QuanLyHoSoPopupService } from './quan-ly-ho-so-popup.service';
import { HoSoDialogComponent } from './ho-so-dialog/ho-so-dialog.component';
import { HoSoDeleteComponent } from './ho-so-delete/ho-so-delete.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';

@Component({
  selector: 'app-quan-ly-ho-so',
  templateUrl: './quan-ly-ho-so.component.html',
  styleUrls: ['./quan-ly-ho-so.component.css']
})
export class QuanLyHoSoComponent implements OnInit {
  hosos : HoSo[];
  page = 1;
  options: Options;

  // filter item
  gearBoxIdFilter : Array<Select2OptionData>;
  profileIdFilter: Array<Select2OptionData>;
  profileNameFilter: Array<Select2OptionData>;
  //
  constructor(
    private hoSoPopupService: QuanLyHoSoPopupService,
    private activeModal: NgbActiveModal

  ) {
    this.options = {
      width: '100%',
      closeOnSelect: true,
      multiple: true,
      tags: true,
    }
   }

  ngOnInit() {
    this.hosos = hosos;
    
  }
  openDialog(id?: number) {

    if (id) {
      this.hoSoPopupService
        .open(HoSoDialogComponent as Component, id);
      console.log(id);

    } else {
      this.hoSoPopupService
        .open(HoSoDialogComponent as Component);
    }

  }
  openDeleteDialog(id?: number) {

      this.hoSoPopupService
        .open(HoSoDeleteComponent as Component, id);
      console.log(id);
  }
  loadPages(page : number) {
    
  }

  getFilterOptions(value1, value2, value3) {

  }
}
