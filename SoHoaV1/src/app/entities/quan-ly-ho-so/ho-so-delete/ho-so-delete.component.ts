import { Component, OnInit } from '@angular/core';
import { HoSo, hosos } from '../../../model/ho-so.model';
import { QuanLyHoSoPopupService } from '../quan-ly-ho-so-popup.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ho-so-delete',
  templateUrl: './ho-so-delete.component.html',
  styleUrls: ['./ho-so-delete.component.css']
})
export class HoSoDeleteComponent implements OnInit {
  hoso: HoSo;
  constructor(
    private hoSoPopupService: QuanLyHoSoPopupService,
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit(
  ) {
    this.hoso = this.hoSoPopupService.getHoSoById();
  }
  deleteHoSo(id : number) {
    if (id && id != undefined) {
      for (let i = 0; i < hosos.length; i ++) {
        if (hosos[i].id == id) {
          hosos.splice(i, 1);
          break;
        }
      }
      this.activeModal.dismiss('cancel');
    }
  }

}
