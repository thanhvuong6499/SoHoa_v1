import { Component, OnInit } from '@angular/core';
import { Phong, phongs } from '../../../model/phong.model';
import { QuanLyPhongPopupService } from '../quan-ly-phong-popup.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { QuanLyPhongService } from '../quan-ly-phong.service';


@Component({
  selector: 'app-phong-delete',
  templateUrl: './phong-delete.component.html',
  styleUrls: ['./phong-delete.component.css']
})
export class PhongDeleteComponent implements OnInit {
  phong: Phong;
  constructor(
    public activeModal: NgbActiveModal,
    private phongPopupService: QuanLyPhongPopupService,
    private phongService: QuanLyPhongService,
    private toasts: ToastrService
  ) { this.phong = new Phong() }

  ngOnInit() {
    if(this.phongPopupService.result.item != undefined){
      this.phong = this.phongPopupService.result.item;
    }
  }
  deleteFont(id : number) {
    this.phongService.deletePhong(id)
      .subscribe((result) => {
        console.log(result)
        
      },
      (error) => {
        alert("Xóa thất bại. Lỗi: " + JSON.stringify(error));
      }, () => {
        this.activeModal.dismiss("deleted");
        this.onDeleteSuccess();
      });
  }
  onDeleteSuccess(){
    this.toasts.success("delete success")
  }
}
