import { Component, OnInit } from '@angular/core';
import { VanBan, vanbans } from '../../../model/van-ban.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QuanLyTaiLieuPopupService } from '../quan-ly-tai-lieu-popup.service';

@Component({
  selector: 'app-tai-lieu-dialog',
  templateUrl: './tai-lieu-dialog.component.html',
  styleUrls: ['./tai-lieu-dialog.component.css']
})
export class TaiLieuDialogComponent implements OnInit {

  vanban: VanBan;
  constructor(
   private activeModal: NgbActiveModal,
   private taiLieuPopupService: QuanLyTaiLieuPopupService
  ) { }

  ngOnInit() {
    this.vanban = this.taiLieuPopupService.getVanBanById()
  }
  clear() {
    this.activeModal.dismiss('cancel');
  
  }
  save(){
    if (this.vanban.id && this.vanban.id != undefined) {
      for(let i = 0; i < vanbans.length; i++) {
        if (vanbans[i].id == this.vanban.id) {
          vanbans[i] = this.vanban;
          break;
        }
      }
    }
    else {
      let id = vanbans.length;
      this.vanban.id = id + 1;
      vanbans.push(this.vanban);
    }
    this.clear();
    
  }


}
