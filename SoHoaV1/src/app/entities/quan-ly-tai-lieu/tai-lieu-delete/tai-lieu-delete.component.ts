import { Component, OnInit } from '@angular/core';
import { VanBan } from '../../../model/van-ban.model';
import { QuanLyTaiLieuPopupService } from '../quan-ly-tai-lieu-popup.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tai-lieu-delete',
  templateUrl: './tai-lieu-delete.component.html',
  styleUrls: ['./tai-lieu-delete.component.css']
})
export class TaiLieuDeleteComponent implements OnInit {
  vanban: VanBan;
  constructor(
    private taiLieuPopupService: QuanLyTaiLieuPopupService,
    private activeModal: NgbActiveModal
  ) { }

  ngOnInit() {
    this.vanban = this.taiLieuPopupService.getVanBanById();
  }

}
