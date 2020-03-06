import { Component, OnInit } from '@angular/core';
import { HoSo } from '../../../model/ho-so.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QuanLyHoSoPopupService } from '../quan-ly-ho-so-popup.service';
import { ToastrService } from 'ngx-toastr';
import { FileUploader } from 'ng2-file-upload';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { QuanLyHoSoService } from '../quan-ly-ho-so.service';
import { FileUpload } from '../../../model/file.model';

@Component({
  selector: 'app-ho-so-dialog',
  templateUrl: './ho-so-dialog.component.html',
  styleUrls: ['./ho-so-dialog.component.css']
})
export class HoSoDialogComponent implements OnInit {
  hoso: HoSo;
  public uploader : FileUploader = new FileUploader({
    isHTML5: true
  });
  options: Options;
  profileTypeList: Array<Select2OptionData>;
  fileNotationList: Array<Select2OptionData>;
  gearBoxIdList: Array<Select2OptionData>;

  constructor (
   private activeModal: NgbActiveModal,
   private hoSoPopupService: QuanLyHoSoPopupService,
   private toastr: ToastrService,
   private service: QuanLyHoSoService
  ) 
  {
    this.hoso = new HoSo();
    this.options = {
      theme: 'classic',
      width: '100%'
    }
  }

  ngOnInit() {
  //  this.hoso = this.hoSoPopupService.getHoSoById()
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
    console.log(data.getAll('files'));
    //  this.uploader.clearQueue();
    return data;
  }

  clear() {
    this.activeModal.dismiss('cancel');
  }
  save() {
    console.log(this.hoso);
    var files = new FormData();
    if (this.uploader.queue.length > 0) {
      files = this.uploadSubmit();
    }
    else {
      files = undefined;
    }
    this.service.insertSingleProfile(this.hoso, files)
      .subscribe((result) => {
        console.log(result);
        if (!result.isSuccess && result.errorCode == "-1") {
          var lstFilesAlreadyExists : string[] = new Array<string>();
          lstFilesAlreadyExists = JSON.parse(result.returnValue);
          var arrFileName: string[] = new Array<string>();
          for (const file of lstFilesAlreadyExists) {
            let fileNameArr = file.split('\\');
            let fileName = fileNameArr[fileNameArr.length -1];
            arrFileName.push(fileName);
          }
          if (confirm(`Tồn tại file đã được upload trên hệ thống, chọn OK để tiến hành ghi đè file đã tồn tại bằng file mới, chọn Cancel để hủy bỏ.
          \nDanh sách file đã tồn tại:\n${
            arrFileName.toString().split(',').join('\n')
          }`)) {
            files = this.uploadSubmit();
            files.append('overwrite', 'accept');
            this.service.insertSingleProfile(this.hoso, files)
              .subscribe((result) => {
                console.log(result);
              },
              (error) => {
                console.log(error);
              },
              () => {

              });
          }
        }
        else {
          // toàn file mới
          this.activeModal.dismiss('success');
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        this.success("Thêm mới hồ sơ thành công", "Thêm mới hồ sơ");
      });
  }
  success(message : string, title?: string){
    this.toastr.success(message, title);
  }

}
