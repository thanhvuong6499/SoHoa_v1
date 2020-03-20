import { Component, OnInit } from '@angular/core';
import { Document } from '../../../model/document.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QuanLyTaiLieuPopupService } from '../quan-ly-tai-lieu-popup.service';
import { QuanLyTaiLieuService } from '../quan-ly-tai-lieu.service';
import { Select2OptionData } from 'ng-select2';
import { ToastrService } from 'ngx-toastr';
import { Options } from 'select2';

@Component({
  selector: 'app-tai-lieu-dialog',
  templateUrl: './tai-lieu-dialog.component.html',
  styleUrls: ['./tai-lieu-dialog.component.css']
})
export class TaiLieuDialogComponent implements OnInit {

  document: Document = new Document();
  value1 = 'Default';
  isEdit : boolean = false;
  defaultValue : string;
  data: any;
  options: Options;
  documentTypeList: Array<Select2OptionData>;
  languageList: Array<Select2OptionData>;
  profileList: Array<Select2OptionData>;
  formatList: Array<Select2OptionData>;
  confidenceLevelList: Array<Select2OptionData>;
  confidenceLevelId: number;
  languageId: number;
  formatId: number;
  docTypeId: number;
  issuedDate: Date;
  constructor(
   private activeModal: NgbActiveModal,
   private taiLieuPopupService: QuanLyTaiLieuPopupService,
   private taiLieuService : QuanLyTaiLieuService,
   private toastr: ToastrService,
  ) { 
    this.options = {
      multiple: false,
      theme: 'classic',
      closeOnSelect: true,
      width: "100%"
      }
  }

  ngOnInit() {
    this.isEdit = false;
    this.taiLieuService.getDocumentTypeList()
      .subscribe((result) => {
        console.log(result);
        if (result != undefined) {
          var documentTypeList = [];
          for (var item of result.itemList) {
            var temp = { id: item.documentTypeId.toString(), text: item.typeName };
            documentTypeList.push(temp);
          }
          
          this.documentTypeList = documentTypeList;
          console.log(this.documentTypeList);
        }
      },
      (error) => {
        console.log(error);
      }, () => {
      });
    
    this.taiLieuService.getProfileList()
      .subscribe((result) => {
        var profileList = [];
        for (const item of result) {
          var temp = { id: item.profileId, text: item.fileNotation }
          profileList.push(temp);
        }
        console.log(profileList);
        this.profileList = profileList;
      },
      (error) => {
        console.log(error);
        setTimeout(() => {
          alert("Lấy dữ liệu về hồ sơ thất bại. Lỗi: " + JSON.stringify(error));
        }, 1000);
      },
      () => {
        
      });

    this.taiLieuService.getLanguageList()
      .subscribe((result) => {
        var languageList = [];
        for (var item of result.itemList) {
          var temp = { id: item.languageId, text: item.languageName }
          languageList.push(temp);
        }
        
        this.languageList = languageList;
      },
      (error) => {
        console.log(error);
        setTimeout(() => {
          alert("Lấy dữ liệu về hồ sơ thất bại. Lỗi: " + JSON.stringify(error));
        }, 1000);
      },
      () => {
        
      });
    this.taiLieuService.getFormatList()
      .subscribe((result) => {
        var formatList = [];
        for (var item of result.itemList) {
          var temp = { id: item.formatId, text: item.formatName }
          formatList.push(temp);
        }
        
        this.formatList = formatList;
      },
      (error) => {
        console.log(error);
        setTimeout(() => {
          alert("Lấy dữ liệu về hồ sơ thất bại. Lỗi: " + JSON.stringify(error));
        }, 1000);
      },
      () => {
        
      });
    this.taiLieuService.getConfidenceLevelList()
      .subscribe((result) => {
        var confidenceLevelList = [];
        for (const item of result.itemList) {
          var temp = { id: item.confidenceLevelId, text: item.confidenceLevelName }
          confidenceLevelList.push(temp);
        }
        
        this.confidenceLevelList = confidenceLevelList;
      },
      (error) => {
        console.log(error);
        setTimeout(() => {
          alert("Lấy dữ liệu về hồ sơ thất bại. Lỗi: " + JSON.stringify(error));
        }, 1000);
      },
      () => {
        
      });
    // edit
    if(this.taiLieuPopupService.result.item != undefined) {
      
      this.document = this.taiLieuPopupService.result.item;
      // binding .Net Datetime to typeScript Date
      this.issuedDate.getDate = (new Date(this.document.issuedDate.toString())).getDate;
      console.log(this.document.issuedDate.toString());
      this.languageId = this.document.languageId;
      this.confidenceLevelId = this.document.confidenceLevelId;
      this.formatId = this.document.formatId;
      this.docTypeId = this.document.docTypeId;
      this.isEdit = true
    }
  }
  clear() {
    this.activeModal.dismiss('cancel');
  
  }
  save() {
    if (this.isEdit) {
      console.log(this.document);
      this.taiLieuService.updateDocument(this.document)
        .subscribe((result) => {
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
      console.log(this.document)
        this.taiLieuService.createDocument(this.document)
        .subscribe((result) => {
          console.log(result);
        },
        (error) => {
          console.log(error);
        }, () => {
          this.onSaveSuccess("Thêm mới thành công");
          this.activeModal.dismiss("Create new document successfully");
        });
    }
  }
  onSaveSuccess(message: string) {
    this.toastr.success(message);
  }
  onSaveError(message){
    this.toastr.error(message);
  }
  ngOnDestroy(): void {
    
  }
}
