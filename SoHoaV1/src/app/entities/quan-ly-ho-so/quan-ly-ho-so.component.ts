import { Component, OnInit } from '@angular/core';
import { HoSo } from '../../model/ho-so.model';
import { hosos } from '../../model/ho-so.model';
import { QuanLyHoSoPopupService } from './quan-ly-ho-so-popup.service';
import { HoSoDialogComponent } from './ho-so-dialog/ho-so-dialog.component';
import { HoSoDeleteComponent } from './ho-so-delete/ho-so-delete.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-quan-ly-ho-so',
  templateUrl: './quan-ly-ho-so.component.html',
  styleUrls: ['./quan-ly-ho-so.component.css']
})
export class QuanLyHoSoComponent implements OnInit {
  hosos : HoSo[];
  constructor(
    private hoSoPopupService: QuanLyHoSoPopupService,
    private activeModal: NgbActiveModal

  ) { }

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

}
