import { Component, OnInit } from '@angular/core';
import { VanBan } from '../../../model/van-ban.model';
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
    console.log(this.vanban);
    
  }


}
