import { Component, OnInit, AfterContentInit, HostListener } from '@angular/core';
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
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { QuanLyChuKySoService } from '../../quan-ly-chu-ky-so/quan-ly-chu-ky-so.service';
import { DigitalSignature } from '../../../model/digital-signature.model';
import { Compiler } from '@angular/core';

@Component({
  selector: 'app-van-ban-pdf',
  templateUrl: './van-ban-pdf.component.html',
  styleUrls: ['./van-ban-pdf.component.css']
})
export class VanBanPdfComponent implements OnInit, AfterContentInit {
  pdfSrc: string | PDFSource | ArrayBuffer = undefined;
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
  saveLoading: boolean = false;
  continueLoading: boolean = false;

  // signature
  loadingSignature = false;
  checked : boolean;
  hasImage: boolean = false;
  imageSrc: string = '#';
  signature: DigitalSignature[];

  gearBoxId: number;
  profileId: number;
  fileId: number;
  
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
    private quanLyTaiLieuService: QuanLyTaiLieuService,
    private signatureService: QuanLyChuKySoService,
    private _compiler : Compiler
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
      pageAmount: [''],
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
      computerFileId:['', Validators.required],
      organID: ['', Validators.required],
      tabOfContID: ['', Validators.required],
      fontID: ['', Validators.required],
      gearBox: ['', Validators.required],
      signature: ['']
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
          // setTimeout(() => {
          //   alert("Lấy dữ liệu về hồ sơ thất bại. Lỗi: " + JSON.stringify(error));
          // }, 1000);
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
    this.document.documentCode = '';
    this.document.fileId = undefined;
    this.document.computerFileId = undefined;
    this.document.codeNumber = '';
    this.document.docOrdinal = undefined;
    this.document.codeNotation = '';
    this.document.pageAmount = undefined;
    this.document.subject = '';
    this.document.description = '';
    this.document.inforSign = '';
    this.document.keyword = '';
    this.document.mode = '';
    this.document.autograph = '';
    this.checked = false;
    this.loadingSignature = false;
    this.hasImage = false;
    this.submitted = false;
  }

  get formControl() {
    return this.form.controls;
  }
  save(value : string) {
    this.submitted = true;
    console.log(this.formControl);
    if (this.form.invalid) { return; }
    if (value == 'save') {
      this.saveLoading = true;
    }
    else {
      this.continueLoading = true;
    }
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
            if (value == 'save') {
              this.saveLoading = false;
              window.location.href = '#/QuanLyTaiLieu/taiLieu';
            }
            else {
              this.continueLoading = false;
            }
            this.activeModal.dismiss("Update successfully.");
            this.onSaveSuccess("Chỉnh sửa thành công");
          });
    }
    else {
      console.log(this.document);
      this.taiLieuService.createDocument(this.document, this.checked, this.imageSrc, this.document.serverPath)
        .subscribe((result) => {
          if (result.isSuccess) {
            this.onSaveSuccess("Thêm mới thành công");
            this.clear();
          }
          else {
            this.toastr.warning(result.errorMessage, "Thông báo");
          }
        },
          (error) => {
            console.log(error);
            setTimeout(() => {
              this.toastr.warning("Thêm mới thất bại, vui lòng thử lai.", "Thông báo");
            }, 5000);
          }, () => {
             if (value == 'save') {
                this.saveLoading = false;
                window.location.href = '#/QuanLyTaiLieu/taiLieu';
              }
            else {
              this.continueLoading = false;
              this.onGearBoxChange(this.gearBoxId);
            }
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
    {
        params = this.fontID;
    }
    else {
      this.hoSoService.getProfileByGearBoxId(gearBoxId)
      .subscribe((data) => {
        if (data.isSuccess) {
          this.document.fileId = data.item.profileId;
          if (this.document.fileId != undefined) {
            this.onProfileChange(this.document.fileId);
          }
        }
        else {
          switch(data.errorCode) {
            case "CO": {
              this.toastr.warning(data.errorMessage, "Thông báo");
              setTimeout(() => {
                window.location.reload();
              }, 2000);
              break;
            }
            case "EN": {
              this.toastr.warning(data.errorMessage, "Thông báo");
              this.document.fileId = undefined;
              this.document.computerFileId = undefined;
              break;
            }
            default: {
              this.toastr.warning(data.errorMessage, "Thông báo");
              break;
            }
          }
        }
      },
      (error) => {
        alert("Lấy dữ liệu phông thất bại. Lỗi: " + JSON.stringify(error));
      },
      () => {
        // hoàn thành
        
      });
    }
  }

  onProfileChange(profileId : any) {
    this.pdfSrc = undefined;
    var params = profileId;
    if(params == undefined || params == null || params == "")
    {
      params  = this.fontID;
    }
    else {
      this.hoSoService.getComputerFilesByProfileId(profileId)
      .subscribe((data) => {
        this._compiler.clearCache();
        if (data != undefined && data.itemList.length != 0) {
          // var computerFileList = [];
          // for (const item of data.itemList) {
          //   var temp = { id: item.fileId, text: item.fileName, path: item.url }
          //   computerFileList.push(temp);
          //   this.computerFileList.push({fileId: item.fileId, url: item.url, clientUrl: item.clientUrl});
          // }
          // this.computerFileSelect2 = computerFileList;
          this.document.serverPath = data.item.clientUrl;
          this.document.computerFileId = data.item.fileId;
          this.document.pageAmount = data.item.pageNumber;
          this.pdfSrc = data.item.clientUrl;
        }
        else {
          this.computerFileList = [];
        }
      },
      (error) => {
        alert("Lấy dữ liệu phông thất bại. Lỗi: " + JSON.stringify(error));
      },
      () => {
        // hoàn thành

      });
    }
  }
  
  onFileSelected(id?: any) {
    // this.computerFileList.forEach((item) => {
    //   if(item.fileId == id){
    //     this.pdfSrc = item.clientUrl;
    //   }
    // });

    // let $img: any = document.querySelector('#file');

    // if (typeof (FileReader) !== 'undefined') {
    //   let reader = new FileReader();

    //   reader.onload = (e: any) => {
    //     this.pdfSrc = e.target.result;
    //   };

    //   reader.readAsArrayBuffer($img.files[0]);
    // }
  }

  exit() {
    window.location.href = '#/QuanLyTaiLieu/taiLieu';
  }

  getSignatureStatus() {
    if (this.checked === true) {
      this.loadingSignature = true;
      this.signatureService.signatureGetStatus()
        .subscribe((result) => {
          if (result.isSuccess) {
            this.signature = result.itemList.filter(item => item.status === 1);
            if (this.signature.length > 0) {
              this.loadingSignature = false;
              this.hasImage = true;
              this.imageSrc = this.signature[0].serverPath;
              //$(document).find("[data-page-number=1]").append(`<img class="image-preview" src="${this.imageSrc}" alt=""/>`)
            }
            else {
              this.loadingSignature = false;
              this.toastr.info("Vui lòng áp dụng một chữ ký số trong mục quản lý chữ ký số và thử lại.", "Thông báo");
              this.checked = false;
            }
          }
        }, (error) => {
          setTimeout(() => {
            this.toastr.error("Có lỗi xảy ra, vui lòng thử lại.", "Lỗi");
            this.loadingSignature = false;
          }, 5000);
        });
    }
    else {
      this.hasImage = false;
      this.imageSrc = "#";
    }
  }
  @HostListener('window:scroll', ['$event']) 
    scrollHandler(event) {
      console.log("Scroll Event");
    }

  ngAfterContentInit() {
    this._compiler.clearCache();
  }
}
