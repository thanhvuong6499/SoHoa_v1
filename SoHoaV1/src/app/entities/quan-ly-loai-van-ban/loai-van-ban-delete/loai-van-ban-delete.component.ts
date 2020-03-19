import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { OrganType } from '../../../model/organ-type.model';
import { QuanLyLoaiVanBanPopupService } from '../quan-ly-loai-van-ban-popup.service';
import { LoaiVanBanService } from '../loai-van-ban.service';
import { LoaiVanBan } from '../../../model/loai-van-ban';

@Component({
  selector: 'app-loai-van-ban-delete',
  templateUrl: './loai-van-ban-delete.component.html',
  styleUrls: ['./loai-van-ban-delete.component.css']
})
export class LoaiVanBanDeleteComponent implements OnInit {
  loaiVanBan: LoaiVanBan;
  constructor(
    public activeModal: NgbActiveModal,
    private popupService: QuanLyLoaiVanBanPopupService,
    private service: LoaiVanBanService,
    private toasts: ToastrService
  ) { }

  ngOnInit() {
    this.loaiVanBan = new LoaiVanBan();
    if(this.popupService.result !=null){
      if(this.popupService.result.item != undefined){
        this.loaiVanBan= this.popupService.result.item;
      }
    }
  }

  deleteLoaiVanBan(id : any) {
    this.service.deleteLoaiVanBan(id)
      .subscribe((result) => {
        console.log(result.isSuccess);
        if(result.isSuccess)
          this.onDeleteSuccess('Xóa thành công!!!');
        else  
          this.onDeleteError('Xóa thất bại, loại cơ quan đang được áp dụng!!!');
      },
      (error) => {
        alert("Xóa thất bại. Lỗi: " + JSON.stringify(error));
      }, () => {
      });
      this.onClose();
  }

  onClose(){
    this.service.filter('Register click');
    this.activeModal.close();
  }

  
  onDeleteError(message){
    this.toasts.success(message);
  }

  onDeleteSuccess(message){
    this.toasts.success(message)
  }

}
