import { Component, OnInit } from '@angular/core';
import { DanhMuc, danhmucs } from '../../../model/danh-muc.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QuanLyDanhMucPopupService } from '../quan-ly-danh-muc-popup.service';
import { QuanLyDanhMucService } from '../quan-ly-danh-muc.service';
import { Phong, phongs } from '../../../model/phong.model';
import { Select2OptionData } from 'ng-select2';
import { Subscription } from 'rxjs';
import { Options } from 'select2';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-danh-muc-dialog',
  templateUrl: './danh-muc-dialog.component.html',
  styleUrls: ['./danh-muc-dialog.component.css']
})
export class DanhMucDialogComponent implements OnInit {
  danhmuc: DanhMuc;
  phongs: Phong[];
  isEdit: boolean = false;
  defaultValue : string;
  data: any;
  lstOrgan: Array<Select2OptionData>;
  lstFont: Array<Select2OptionData>;
  options: Options;
  optionsOrgan :Options;
  
  private subscription: Subscription;
  private eventSubscriber: Subscription;
  constructor(
    private danhMucPopupService: QuanLyDanhMucPopupService,public activeModal: NgbActiveModal,
    public service: QuanLyDanhMucService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute)
    {
      this.danhmuc = new DanhMuc();
      this.options = {
        multiple: false,
        theme: 'classic',
        closeOnSelect: true,
        width: "100%"
      }
    }

  ngOnInit() {
    this.isEdit = false;
    this.service.getAllPhong()
      .subscribe((result) => {
        if (result != undefined) {
          var phongs = [];
          for (var item of result.itemList) {
            var temp = { id: item.fontID, text: item.fontName };
            phongs.push(temp);
          }
          this.lstFont = phongs;
        }
      },
      (error) => {
        console.log(error);
      }, () => {
      });
      if(this.danhMucPopupService.result.item != undefined){
        this.danhmuc = this.danhMucPopupService.result.item;
        this.isEdit = true;
      }
  }
  clear() {
    this.activeModal.dismiss('cancel');
  }
  save() {
    if (this.isEdit) {
      this.service.updateDanhMuc(this.danhmuc)
        .subscribe((result) => {
          console.log(result);
        },
        (error)=> {
          console.log(error);
          
          // this.onSaveError();
        },
        () => {
          // do something
          

          this.activeModal.dismiss("Update successfully.");
          this.onSaveSuccess("Chỉnh sửa thành công");

        });
    }
    else {
        this.service.insertNewDanhMuc(this.danhmuc)
        .subscribe((result) => {
          console.log(result);
        },
        (error) => {
          console.log(error);
        }, () => {
          this.onSaveSuccess("Thêm mới thành công");
          this.activeModal.dismiss("Create new successfully");
        });
    }
  }
  onSaveSuccess(message: string){
    this.toastr.success(message);
  }
  onSaveError(message){
    this.toastr.success(message);
  }
  deleteFont(event) {
    console.log(event);
  }
  ngOnDestroy(): void {
  }

}
