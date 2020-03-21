import { Component, OnInit, AfterContentInit } from '@angular/core';
import { HoSo } from '../../../model/ho-so.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QuanLyHoSoPopupService } from '../quan-ly-ho-so-popup.service';
import { ToastrService } from 'ngx-toastr';
import { FileUploader } from 'ng2-file-upload';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { QuanLyHoSoService } from '../quan-ly-ho-so.service';
import { FileUpload } from '../../../model/file.model';
import { BaseCondition } from '../../../common';
import { HtmlParser } from '@angular/compiler';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BaseCdkCell } from '@angular/cdk/table';
import { Alert } from '../../../containers/_alert';

@Component({
  selector: 'app-ho-so-dialog',
  templateUrl: './ho-so-dialog.component.html',
  styleUrls: ['./ho-so-dialog.component.css']
})
export class HoSoDialogComponent implements OnInit, AfterContentInit {

  hoso: HoSo;
  date: Date;
  
  public uploader : FileUploader = new FileUploader({
    isHTML5: true
  });
  // lấy danh sách file sau khi đã tải file lên trước đó
  public uploaderAfterChange : FileUploader = new FileUploader ({
    isHTML5: true
  })
  options: Options;
  profileTypeList: Array<Select2OptionData>;
  fileNotationList: Array<Select2OptionData>;
  gearBoxTitleList: Array<Select2OptionData>;

  allGearBox: Array<Select2OptionData>;
  allProfileType: Array<Select2OptionData>;

  isOverwrite: boolean = false;
  profile: HoSo = new HoSo();
  isUpdate: boolean = false;

  form : FormGroup;
  submitted = false;
  loading = false;

  constructor (
   private activeModal: NgbActiveModal,
   private hoSoPopupService: QuanLyHoSoPopupService,
   private toastr: ToastrService,
   private service: QuanLyHoSoService,
   private formBuilder: FormBuilder
  )
  {
    this.profileTypeList = new Array<Select2OptionData>();
    this.fileNotationList = new Array<Select2OptionData>();
    this.gearBoxTitleList = new Array<Select2OptionData>();
    this.allGearBox = new Array<Select2OptionData>();
    this.allProfileType = new Array<Select2OptionData>();
    this.hoso = new HoSo();
    this.hoso.profileId = undefined;
    this.options = {
      theme: 'classic',
      width: '100%'
    }
    
  }

  ngOnInit() {
  //  this.hoso = this.hoSoPopupService.getHoSoById()
  //  this.hoso = this.hoSoPopupService.profile;
    this.form = this.formBuilder.group({
      gearBoxId: ['', Validators.required],
      fileCode: ['', Validators.required],
      title: ['', Validators.required],
      fileNotation: ['', Validators.required],
      profileTypeId: ['', Validators.required],
      maintenance: ['', Validators.required],
      rights: [''],
      language: [''],
      startDate: [undefined, Validators.required],
      endDate: [undefined, Validators.required],
      totalDoc: ['', Validators.required],
      description: [''],
      inforSign: [''],
      keyWord: [''],
      pageNumber: [''],
      sheetNumber: ['', Validators.required],
      format: ['']
    })
    this.getAddNew();
    if (this.hoSoPopupService.profile != undefined) {
      this.isUpdate = true;
      this.hoso = this.hoSoPopupService.profile.item;
      this.hoso.gearBoxId = this.hoSoPopupService.profile.item.gearBoxId;
      this.hoso.profileTypeId = this.hoSoPopupService.profile.item.profileTypeId;
    }
    
  }

  get f() {
    return this.form.controls;
  }

  uploadSubmit () {
    for (var i = 0; i < this.uploader.queue.length; i++) {
      let fileItem = this.uploader.queue[i]._file;
      if(fileItem.size > 10000000) {
        alert("File nên có kích thước nhỏ hơn 10Mb.");
        return;
      }
    }
    var data = new FormData();
    for (var j = 0; j < this.uploader.queue.length; j++) {
      let fileItem = this.uploader.queue[j]._file;
      data.append('files', fileItem);
      data.append('fileSeq', 'seq'+j);
      data.append('dataType', fileItem.type.split('/')[1]);
    //  this.uploadFile(data).subscribe(data => alert(data.message));
    }
    //  this.uploader.clearQueue();
    return data;
  }

  clear() {
    this.activeModal.dismiss('cancel');
  }
  
  save() {
    this.submitted = true;
    if (this.form.invalid) return;

    this.loading = true;

    var files = new FormData();
    if (this.uploader.queue.length > 0) {
      files = this.uploadSubmit();
    }
    else {
      files = undefined;
    }
    if (this.hoso.profileId == undefined) {
      this.service.insertSingleProfile(this.hoso, files)
      .subscribe((result) => {
        if (!result.isSuccess)
        {
          switch (result.errorCode) {
            case "-1": { // EXCEPTION
              this.toastr.error("Thêm mới thất bại, lỗi: " + result.errorMessage + ", vui lòng thử lại hoặc bấm Cancel để hủy bỏ.");
              break;
            }
            case "-2": { // OVERWRITE
                var lstFilesAlreadyExists : string[] = new Array<string>();
                var arrFileName: string[] = new Array<string>();
                if (result.returnValue && result.returnValue != undefined) {
                  lstFilesAlreadyExists = JSON.parse(result.returnValue);
                  for (const file of lstFilesAlreadyExists) {
                    let fileNameArr = file.split('\\');
                    let fileName = fileNameArr[fileNameArr.length -1];
                    arrFileName.push(fileName);
                  }
                }

                if (confirm(`Tồn tại file đã được upload trên hệ thống, chọn OK để tiến hành ghi đè file đã tồn tại bằng file mới, chọn Cancel để hủy bỏ.
                \nDanh sách file đã tồn tại:\n${
                  arrFileName.toString().split(',').join('\n')
                }`)) {
                  files = this.uploadSubmit();
                  files.append('overwrite', 'accept');
                  this.service.insertSingleProfile(this.hoso, files)
                    .subscribe((result) => {
                      if (result.isSuccess) {
                        
                        this.isOverwrite = true;
                      }
                      else {
                        console.log(result);
                        this.toastr.error("Ghi đè file thất bại, vui lòng kiểm tra và thử lại.", "Thông báo");
                      }
                    },
                    (error) => {
                      console.log(error);
                    },
                    () => {
                      if (this.isOverwrite) {
                        this.activeModal.dismiss('success');
                        this.toastr.info(`Ghi đè ${lstFilesAlreadyExists.length} file thành công`, "Thông báo");
                        this.toastr.info("Bạn vừa tải lên " + this.uploader.queue.length + " file.", "Thông báo");
                        this.uploader.clearQueue();
                      }
                    });
                }
                else {
                  this.toastr.error("Ghi đè file thất bại, vui lòng kiểm tra và thử lại.", "Thông báo");
                }
              break;
            }
            case "-3": { // EXISTS
              this.toastr.warning("Đã tồn tại hồ sơ có mã hồ sơ: " + this.hoso.fileCode + " trên hệ thống, vui lòng thử lại hoặc bấm Cancel để hủy bỏ.");
              break;
            }
            default: {
              this.toastr.error("Thêm mới thất bại, lỗi: " + result.errorMessage + ", vui lòng thử lại hoặc bấm Cancel để hủy bỏ.")
              break;
            }
          }
        }

        // if (!result.isSuccess && result.errorCode == "-2") {
        //   var lstFilesAlreadyExists : string[] = new Array<string>();
        //   var arrFileName: string[] = new Array<string>();
        //   if (result.returnValue && result.returnValue != undefined) {
        //     lstFilesAlreadyExists = JSON.parse(result.returnValue);
        //     for (const file of lstFilesAlreadyExists) {
        //       let fileNameArr = file.split('\\');
        //       let fileName = fileNameArr[fileNameArr.length -1];
        //       arrFileName.push(fileName);
        //     }
        //   }

        //   if (confirm(`Tồn tại file đã được upload trên hệ thống, chọn OK để tiến hành ghi đè file đã tồn tại bằng file mới, chọn Cancel để hủy bỏ.
        //   \nDanh sách file đã tồn tại:\n${
        //     arrFileName.toString().split(',').join('\n')
        //   }`)) {
        //     files = this.uploadSubmit();
        //     files.append('overwrite', 'accept');
        //     this.service.insertSingleProfile(this.hoso, files)
        //       .subscribe((result) => {
        //         if (result.isSuccess) {
        //           this.isOverwrite = true;
        //         }
        //         else {
        //           console.log(result.errorCode);
        //           this.toastr.error("Ghi đè file thất bại, vui lòng kiểm tra và thử lại.", "Thông báo");
        //         }
        //       },
        //       (error) => {
        //         console.log(error);
        //       },
        //       () => {
        //         if (this.isOverwrite) {
        //           this.activeModal.dismiss('success');
        //           this.toastr.info(`Ghi đè ${lstFilesAlreadyExists.length} file thành công`, "Thông báo");
        //           this.toastr.info("Bạn vừa tải lên " + this.uploader.queue.length + " file.", "Thông báo");
        //           this.uploader.clearQueue();
        //         }
        //       });
        //   }
        //   else {
        //     this.toastr.error("Ghi đè file thất bại, vui lòng kiểm tra và thử lại.", "Thông báo");
        //   }
        // }
        // else if (!result.isSuccess) {
        //   this.toastr.error("Thêm mới thất bại", "Thông báo");
        // }
        else {
          // toàn file mới
          if (this.uploader.queue.length > 0) {
            this.toastr.info("Bạn vừa tải lên " + this.uploader.queue.length + " file.", "Thông báo");
          }
          this.uploader.clearQueue();
          this.success("Thêm mới hồ sơ thành công", "Thêm mới hồ sơ");
          this.activeModal.dismiss('success');
        }
      },
      (error) => {
        console.log(error);
        this.toastr.error("Thêm mới thất bại", "Thông báo");
      },
      () => {
      //  this.success("Thêm mới hồ sơ thành công", "Thêm mới hồ sơ");
      //  this.activeModal.dismiss('success');
        // if (!this.isOverwrite) 
        // {
        //   this.success("Thêm mới hồ sơ thành công", "Thêm mới hồ sơ");
        // }
      });
    }
    else {
      this.service.updateSingleProfile(this.hoso, files)
      .subscribe((result) => {

        if (!result.isSuccess) {
          switch (result.errorCode) {
            case "-1": {
              this.toastr.error("Cập nhật thất bại, lỗi: " + result.errorMessage + ", vui lòng thử lại hoặc bấm Cancel để hủy bỏ.");
              break;
            }
            case "-2": {
                var lstFilesAlreadyExists : string[] = new Array<string>();
                var arrFileName: string[] = new Array<string>();
                if (result.returnValue && result.returnValue != undefined) {
                  lstFilesAlreadyExists = JSON.parse(result.returnValue);
                  for (const file of lstFilesAlreadyExists) {
                    let fileNameArr = file.split('\\');
                    let fileName = fileNameArr[fileNameArr.length -1];
                    arrFileName.push(fileName);
                  }
                }
                if (confirm(`Tồn tại file đã được upload trên hệ thống, chọn OK để tiến hành ghi đè file đã tồn tại bằng file mới, chọn Cancel để hủy bỏ.
                \nDanh sách file đã tồn tại:\n${
                  arrFileName.toString().split(',').join('\n')
                }`)) {
                  files = this.uploadSubmit();
                  files.append('overwrite', 'accept');
                  this.service.updateSingleProfile(this.hoso, files)
                    .subscribe((result) => {
                      if (result.isSuccess) {
                        
                        this.isOverwrite = true;
                      }
                      else {
                      //  console.log(result);
                        this.toastr.error("Ghi đè file thất bại, vui lòng kiểm tra và thử lại.", "Thông báo");
                      }
                    },
                    (error) => {
                      console.log(error);
                    },
                    () => {
                      if (this.isOverwrite) {
                        this.activeModal.dismiss('success');
                        this.toastr.info(`Ghi đè ${lstFilesAlreadyExists.length} file thành công`, "Thông báo");
                        this.toastr.info("Bạn vừa tải lên " + this.uploader.queue.length + " file.", "Thông báo");
                        this.uploader.clearQueue();
                      }
                    });
                }
                else {
                  this.toastr.error("Ghi đè file thất bại, vui lòng kiểm tra và thử lại.", "Thông báo");
                }
              break;
            }
            default:
            {
              this.toastr.error("Cập nhật thất bại, lỗi: " + result.errorMessage + ", vui lòng thử lại hoặc bấm Cancel để hủy bỏ.");
              break;
            }
          }
        }

        // if (!result.isSuccess && result.errorCode == "-2") {
        //   var lstFilesAlreadyExists : string[] = new Array<string>();
        //   var arrFileName: string[] = new Array<string>();
        //   if (result.returnValue && result.returnValue != undefined) {
        //     lstFilesAlreadyExists = JSON.parse(result.returnValue);
        //     for (const file of lstFilesAlreadyExists) {
        //       let fileNameArr = file.split('\\');
        //       let fileName = fileNameArr[fileNameArr.length -1];
        //       arrFileName.push(fileName);
        //     }
        //   }
        //   if (confirm(`Tồn tại file đã được upload trên hệ thống, chọn OK để tiến hành ghi đè file đã tồn tại bằng file mới, chọn Cancel để hủy bỏ.
        //   \nDanh sách file đã tồn tại:\n${
        //     arrFileName.toString().split(',').join('\n')
        //   }`)) {
        //     files = this.uploadSubmit();
        //     files.append('overwrite', 'accept');
        //     this.service.updateSingleProfile(this.hoso, files)
        //       .subscribe((result) => {
        //         if (result.isSuccess) {
                  
        //           this.isOverwrite = true;
        //         }
        //         else {
        //           console.log(result);
        //           this.toastr.error("Ghi đè file thất bại, vui lòng kiểm tra và thử lại.", "Thông báo");
        //         }
        //       },
        //       (error) => {
        //         console.log(error);
        //       },
        //       () => {
        //         if (this.isOverwrite) {
        //           this.activeModal.dismiss('success');
        //           this.toastr.info(`Ghi đè ${lstFilesAlreadyExists.length} file thành công`, "Thông báo");
        //           this.toastr.info("Bạn vừa tải lên " + this.uploader.queue.length + " file.", "Thông báo");
        //           this.uploader.clearQueue();
        //         }
        //       });
        //   }
        //   else {
        //     this.toastr.error("Ghi đè file thất bại, vui lòng kiểm tra và thử lại.", "Thông báo");
        //   }
        // }
        // else if (!result.isSuccess) {
        //   this.toastr.error("Cập nhật thông tin hồ sơ thất bại, vui lòng thử lại", "Thông báo");
        // }
        else {
          // toàn file mới
          if (this.uploader.queue.length > 0) {
            this.toastr.info("Bạn vừa tải lên " + this.uploader.queue.length + " file.", "Thông báo");
          }
          this.uploader.clearQueue();
          this.success("Cập nhật hồ sơ thành công", "Cập nhật hồ sơ");
          this.activeModal.dismiss('success');
        }
      },
      (error) => {
        console.log(error);
        this.toastr.error("Cập nhật thông tin hồ sơ thất bại, vui lòng thử lại", "Thông báo");
      },
      () => {
      //  this.success("Thêm mới hồ sơ thành công", "Thêm mới hồ sơ");
      //  this.activeModal.dismiss('success');
        // if (!this.isOverwrite) 
        // {
        //   this.success("Thêm mới hồ sơ thành công", "Thêm mới hồ sơ");
        // }
      });
    }

  }

  update() {

  }

  success(message : string, title?: string){
    this.toastr.success(message, title);
  }

  // xóa những file đã được upload trước đó, không cho phép upload trùng lặp
  fileInputChange(value : any) {
    for (var i = 0; i < this.uploader.queue.length - 1; i ++) {
      var fileItem1 = this.uploader.queue[i]._file;
      for (var j = i + 1; j < this.uploader.queue.length; j ++) {
        var fileItem2 = this.uploader.queue[j]._file;
        if (fileItem1.name == fileItem2.name) {
          this.uploader.queue[j].remove();
        }
      }
    }
  }

  getAddNew () {
    this.service.getAllGearBoxAndProfileType()
      .subscribe((result) => {
        var arrGearBox = [];
        for (const item of result.lstGearBox) {
          var temp = { id: item.gearBoxID, text: item.gearBoxTitle }
          arrGearBox.push(temp);
        }
        this.allGearBox = arrGearBox;
        arrGearBox = [];
        for (const item of result.lstProfileTypes) {
          var temp = { id: item.profileTypeId, text: item.profileTypeName }
          arrGearBox.push(temp);
        }
        this.allProfileType = arrGearBox;
      }, (error) => {
        console.log(error);
      },
      () => {

      });
  }
  ngAfterContentInit(): void {
    if (this.isUpdate) {
      var startDate = this.hoso.startDate.toString().split('T')[0];
      var endDate = this.hoso.endDate.toString().split('T')[0];
    }
    
    function getDateValue (startDate : string, endDate : string) {
      if (startDate != undefined && endDate != undefined) {
        $(document).find('#date-input-start').val(startDate);
        $(document).find('#date-input-end').val(endDate);
      }
    }
    function getDate () {
      let str : string = '';
      let today : Date = new Date();
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0'); 
      let yyyy = today.getFullYear();
      //  this.date = new Date(yyyy + '-' + mm + '-' + dd);
      str = yyyy + '-' + mm + '-' + dd;
      return str;
    }
    $(document).ready(function () {
      getDateValue(startDate, endDate);
    });
  }

}
