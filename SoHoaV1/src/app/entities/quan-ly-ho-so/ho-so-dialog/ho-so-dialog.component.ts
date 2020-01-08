import { Component, OnInit } from '@angular/core';
import { HoSo, hosos } from '../../../model/ho-so.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QuanLyHoSoPopupService } from '../quan-ly-ho-so-popup.service';

@Component({
  selector: 'app-ho-so-dialog',
  templateUrl: './ho-so-dialog.component.html',
  styleUrls: ['./ho-so-dialog.component.css']
})
export class HoSoDialogComponent implements OnInit {
  hoso: HoSo;
  constructor(
   private activeModal: NgbActiveModal,
   private hoSoPopupService: QuanLyHoSoPopupService
  ) { }

  ngOnInit() {
    this.hoso = this.hoSoPopupService.getHoSoById()
  }
  clear() {
    this.activeModal.dismiss('cancel');
  
  }
  save(){
    if (this.hoso.id && this.hoso.id != undefined) {
      for(let i = 0; i < hosos.length; i++) {
        if (hosos[i].id == this.hoso.id) {
          hosos[i] = this.hoso;
          break;
        }
      }
    }
    else {
      let id = hosos.length;
      this.hoso.id = id + 1;
      hosos.push(this.hoso);
    }
    this.clear();
    
  }

}
