import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuanLyPhongPopupService } from '../quan-ly-phong-popup.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Phong, phongs } from '../../../model/phong.model';
import { QuanLyPhongService } from '../quan-ly-phong.service';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { organSelect2 } from '../../../model/co-quan.model';

@Component({
  selector: 'app-phong-dialog',
  templateUrl: './phong-dialog.component.html',
  styleUrls: ['./phong-dialog.component.css']
})
export class PhongDialogComponent implements OnInit, OnDestroy {
  phong = new Phong();
  isEdit: boolean = false;
  defaultValue : string;
  data: any;
  lstOrgan: organSelect2[];
  options: Options;
  form: FormGroup;
  submitted = false;
  loading = false;
  

  constructor(
    public activeModal: NgbActiveModal,
    public phongPopupService: QuanLyPhongPopupService,
    public service: QuanLyPhongService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder)
    {
      this.phong = new Phong();
      this.options = {
        multiple: false,
        theme: 'classic',
        closeOnSelect: true,
        width: "100%"
      }
    }

  ngOnInit() {

    this.form = this.formBuilder.group({
      fontNumber: ['', Validators.required],
      fontName: ['', Validators.required],
      organID: ['', Validators.required],
      lang: [''],
      lookupTools: [''],
      history: [''],
      note: ['']
    });
    
    this.isEdit = false;
    this.service.GetAllOrganSelect2()
      .subscribe((result) => {
        if (result != undefined) {
          this.lstOrgan = result;
        }
      },
      (error) => {
      }, () => {
      });
      if(this.phongPopupService.result.item != undefined){
        this.phong = this.phongPopupService.result.item;
        this.isEdit = true;
      }
  }

  get f() {
    return this.form.controls;
  }

  clear() {
    this.activeModal.dismiss('cancel');
  }
  save() {
    this.submitted = true;
    if (this.form.invalid) { return; }
    this.loading = true;
    if(this.phong.organID == undefined || this.phong.organID == null || this.phong.organID==0){
      this.onSaveError("Chọn cơ quan lữu trữ!!!");
    }
    else{
      if (this.isEdit) {
        this.service.updatePhong(this.phong)
          .subscribe((result) => {
            if (result.isSuccess) {
              this.clear();
              this.onSaveSuccess("Chỉnh sửa thành công");
            }
            else {
              this.onSaveError("Chỉnh sửa thất bại, vui lòng thử lại.");
            }
          },
          (error)=> {
            // this.onSaveError();
            this.onSaveError("Chỉnh sửa thất bại, vui lòng thử lại.");
          },
          () => {
            this.onClose();
          });
      }
      else {
          this.service.insertNewPhong(this.phong)
          .subscribe((result) => {
            if (result.isSuccess) {
              this.toastr.success("Thêm mới thành công");
              this.clear();
              this.onClose();
            }
            else {
              this.onSaveError("Thêm mới thất bại, vui lòng thử lại");
            }
          },
          (error) => {
            this.onSaveError("Thêm mới thất bại, vui lòng thử lại");
          }, () => {
            // this.activeModal.dismiss("Create new successfully");
          });
      }
    }
    this.onClose();
  }
  onSaveSuccess(message: string) {
    this.toastr.success(message);
  }

  onSaveError(message: string){
    this.toastr.error(message);
  }

  onClose(){
    this.service.filter('Register click');
  }
  deleteFont(event) {
  }
  ngOnDestroy(): void {
  }

}

