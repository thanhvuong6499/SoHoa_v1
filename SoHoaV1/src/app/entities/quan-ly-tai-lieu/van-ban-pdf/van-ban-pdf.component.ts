import { Component, OnInit } from '@angular/core';
import { PDFSource } from 'ng2-pdf-viewer';
import { Options } from 'select2';
import { Select2OptionData } from 'ng-select2';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QuanLyTaiLieuPopupService } from '../quan-ly-tai-lieu-popup.service';
import { QuanLyTaiLieuService } from '../quan-ly-tai-lieu.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Document } from '../../../model/document.model';
import { QuanLyHopSoService } from '../../quan-ly-hop-so/quan-ly-hop-so.service';
import { QuanLyDanhMucService } from '../../quan-ly-danh-muc/quan-ly-danh-muc.service';
import { HopSo } from '../../../model/hop-so.model';
import { CoQuan } from '../../../model/co-quan.model';
import { Phong } from '../../../model/phong.model';
import { LoaiHoSoService } from '../../quan-ly-loai-ho-so/loai-ho-so.service';
import { QuanLyHoSoService } from '../../quan-ly-ho-so/quan-ly-ho-so.service';
import { FileUpload } from '../../../model/file.model';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-van-ban-pdf',
  templateUrl: './van-ban-pdf.component.html',
  styleUrls: ['./van-ban-pdf.component.css']
})
export class VanBanPdfComponent implements OnInit {
  pdfSrc: string | PDFSource | ArrayBuffer = '../../assets/test.pdf';
  document: Document = new Document();
  computerFile: FileUpload = new FileUpload();
  value1 = 'Default';
  isEdit: boolean = false;
  defaultValue: string;
  data: any;
  options: Options;
  documentTypeList: Array<Select2OptionData>;
  languageList: Array<Select2OptionData>;
  profileList: Array<Select2OptionData>;
  formatList: Array<Select2OptionData>;
  confidenceLevelList: Array<Select2OptionData>;
  lstOrgan: Array<Select2OptionData>;
  lstFont: Array<Select2OptionData>;
  lstDanhMuc: Array<Select2OptionData>;
  gearBoxList: Array<Select2OptionData>;
  computerFileSelect2: Array<Select2OptionData>;
  computerFileList: Array<FileUpload> = new Array<FileUpload>();
  confidenceLevelId: number;
  languageId: number;
  formatId: number;
  form: FormGroup;
  docTypeId: number;
  issuedDate: Date;
  submitted = false;
  documentId: number;
  loading = false;
  hopso: HopSo;
  organ: CoQuan;
  phong: Phong;
  organID: any;
  fontID: any;
  subscription: Subscription;
  
  constructor(
    private activeModal: NgbActiveModal,
    private taiLieuPopupService: QuanLyTaiLieuPopupService,
    private taiLieuService: QuanLyTaiLieuService,
    private toastr: ToastrService,
    private hopsoService: QuanLyHopSoService,
    private formBuilder: FormBuilder,
    private danhmucService: QuanLyDanhMucService,
    private route: ActivatedRoute,
    private hoSoService: QuanLyHoSoService,
    private quanLyTaiLieuService: QuanLyTaiLieuService
  ) {
    this.hopso = new HopSo();
    this.organ = new CoQuan();
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
      documentCode: ['', Validators.required],
      codeNumber: ['', Validators.required],
      docType: ['', Validators.required],
      issuedDate: ['', Validators.required],
      pageAmount: ['', Validators.required],
      codeNotation: ['', Validators.required],
      docOrdinal: ['', Validators.required],
      language: ['', Validators.required],
      format: ['', Validators.required],
      confidenceLevel: ['', Validators.required],
      subject: [''],
      description: [''],
      keyword: [''],
      inforSign: [''],
      mode: [''],
      autograph: [''],
      profile: ['', Validators.required],
      computerFile:['', Validators.required],
      organID: ['', Validators.required],
      tabOfContID: ['', Validators.required],
      fontID: ['', Validators.required],
      gearBox: ['', Validators.required],
      
      // addressDetail: ['']
    });
    this.subscription = this.route.params.subscribe((params) => {
      this.documentId = params['id'];
    });
    
    
    
    this.danhmucService.getAllCoQuan()
      .subscribe((result) => {
        
        if (result != undefined) {
          var organList = [];
          for (var item of result.itemList) {
            var temp = { id: item.organID.toString(), text: item.tenCoQuan };
            organList.push(temp);
          }
          this.lstOrgan = organList;
          
          if(this.lstOrgan != null){
            this.organID = this.lstOrgan[0].id;
          }
          else 
            this.organID = 0;
        }
      },
        (error) => {
          console.log(error);
        }, () => {
        });
    
    this.taiLieuService.getDocumentTypeList()
      .subscribe((result) => {
        
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
    if (this.documentId != null) {

      this.taiLieuService.getDocumentById(this.documentId)
                .subscribe((result) => {
                    const document : Document = result.item;
                    this.document = document;
                    this.organID = this.document.fileId;
                }, (error) => {
                }, () => {
                });
      // binding .Net Datetime to typeScript Date
      // this.issuedDate.getDate = (new Date(this.document.issuedDate.toString())).getDate;
      // this.languageId = this.document.languageId;
      // this.confidenceLevelId = this.document.confidenceLevelId;
      // this.formatId = this.document.formatId;
      // this.docTypeId = this.document.docTypeId;
      this.isEdit = true;
    }
  }
  clear() {
    this.activeModal.dismiss('cancel');

  }

  get formControl() {
    return this.form.controls;
  }
  save() {
    this.submitted = true;
    if (this.form.invalid) { return; }

    this.loading = true;
    if (this.isEdit) {
      console.log(this.document);
      this.taiLieuService.updateDocument(this.document)
        .subscribe((result) => {
        },
          (error) => {
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
  onSaveError(message) {
    this.toastr.success(message);
  }
  ngOnDestroy(): void {

  }
  onOrganChange(organID : any){
    
    var params = organID;
    if(params == undefined || params == null || params == "")
      params  = this.organID;
    else{
      this.hopsoService.getFontByOrganId(params)
      .subscribe((data) => {
        if (data != undefined && data.length != 0) {
            var phongs = [];
            for (const item of data) {
              var temp = { id: item.fontID, text: item.fontName }
              phongs.push(temp);
            }
            this.lstFont = phongs;
            
            if(this.lstFont != null){
              this.fontID = this.lstFont[0].id;
            }
            else 
              this.fontID = 0;
        }
        else{
          this.lstFont = [];
          this.lstDanhMuc = [];
        }
      },
      (error) => {
        this.lstFont = [];
        this.lstDanhMuc = [];
        alert("Lấy dữ liệu phông thất bại. Lỗi: " + JSON.stringify(error));
      },
      () => {
      });
    }
  }
  onFontChange(fontID : any){
    var params = fontID;
    if(params == undefined || params == null || params == "")
      params  = this.fontID;
    else{
      this.hopsoService.getTabByFontId(params)
      .subscribe((data) => {
        if (data != undefined && data.length !=0) {
          var danhmucs = [];
          for (const item of data) {
            var temp = { id: item.tabOfContID, text: item.tabOfContName }
            danhmucs.push(temp);
          }
          console.log(this.lstDanhMuc);
          this.lstDanhMuc = danhmucs;
        }
        else{
          this.lstDanhMuc = [];
        }
      },
      (error) => {
        alert("Lấy dữ liệu phông thất bại. Lỗi: " + JSON.stringify(error));
      },
      () => {
      });
    }
  }

  onTableOfContentChange(tabOfContID : any){
    
    var params = tabOfContID;
    if(params == undefined || params == null || params == "")
      params  = this.fontID;
    else{
      this.hopsoService.getGearBoxByTableOfContentId(tabOfContID)
      .subscribe((data) => {
        if (data != undefined && data.itemList.length !=0) {
          var hopsos = [];
          for (const item of data.itemList) {
            var temp = { id: item.gearBoxID, text: item.gearBoxCode }
            hopsos.push(temp);
          }
          this.gearBoxList = hopsos;
        }
        else{
          this.gearBoxList = [];
        }
      },
      (error) => {
        alert("Lấy dữ liệu phông thất bại. Lỗi: " + JSON.stringify(error));
      },
      () => {
      });
    }
  }
  onGearBoxChange(gearBoxId : any){
    

    var params = gearBoxId;
    if(params == undefined || params == null || params == "")
      params  = this.fontID;
    else{
      this.hoSoService.getProfileByGearBoxId(gearBoxId)
      .subscribe((data) => {
        if (data != undefined && data.itemList.length !=0) {
          var profileList = [];
          for (const item of data.itemList) {
            var temp = { id: item.profileId, text: item.fileCode }
            profileList.push(temp);
          }
          
          this.profileList = profileList;
        }
        else{
          this.profileList = [];
        }
      },
      (error) => {
        alert("Lấy dữ liệu phông thất bại. Lỗi: " + JSON.stringify(error));
      },
      () => {
      });
    }
  }
  onProfileChange(profileId : any){
    
    var params = profileId;
    if(params == undefined || params == null || params == "")
      params  = this.fontID;
    else{
      this.hoSoService.getComputerFilesByProfileId(profileId)
      .subscribe((data) => {
        if (data != undefined && data.itemList.length !=0) {
          var computerFileList = [];
          for (const item of data.itemList) {
            var temp = { id: item.fileId, text: item.fileName, path: item.url }
            computerFileList.push(temp);
            this.computerFileList.push({fileId: item.fileId, url: item.url});
          }
        
          this.computerFileSelect2 = computerFileList;
        }
        else{
          this.computerFileList = [];
        }
      },
      (error) => {
        alert("Lấy dữ liệu phông thất bại. Lỗi: " + JSON.stringify(error));
      },
      () => {
      });
    }
  }
  
  onFileSelected(id?: any) {
    
    this.computerFileList.forEach((item) => {
      console.log(item);
      if(item.fileId == id){
        this.pdfSrc = item.url;
      }
    });
    // let $img: any = document.querySelector('#file');

    // if (typeof (FileReader) !== 'undefined') {
    //   let reader = new FileReader();

    //   reader.onload = (e: any) => {
    //     this.pdfSrc = e.target.result;
    //   };

    //   reader.readAsArrayBuffer($img.files[0]);
    // }
  }
}
