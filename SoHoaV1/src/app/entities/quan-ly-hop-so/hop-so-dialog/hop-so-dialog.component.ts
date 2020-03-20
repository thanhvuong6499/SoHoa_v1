import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HopSo, hopsos } from '../../../model/hop-so.model';
import { QuanLyHopSoPopupService } from '../quan-ly-hop-so-popup.service';
import { Select2OptionData } from 'ng-select2';
import { Options } from 'select2';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { QuanLyDanhMucService } from '../../quan-ly-danh-muc/quan-ly-danh-muc.service';
import { QuanLyHopSoService } from '../../quan-ly-hop-so/quan-ly-hop-so.service';
import { CoQuan } from '../../../model/co-quan.model';
import { Phong } from '../../../model/phong.model';

@Component({
  selector: 'app-hop-so-dialog',
  templateUrl: './hop-so-dialog.component.html',
  styleUrls: ['./hop-so-dialog.component.css']
})
export class HopSoDialogComponent implements OnInit {
  isEdit: boolean = false;
  defaultValue : string;
  data: any;
  lstOrgan: Array<Select2OptionData>;
  lstFont: Array<Select2OptionData>;
  lstDanhMuc: Array<Select2OptionData>;
  options: Options;
  optionsOrgan :Options;
  hopso: HopSo;
  organ: CoQuan;
  phong: Phong;
   constructor(
    private activeModal: NgbActiveModal,
    private hopSoPopupService: QuanLyHopSoPopupService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private hopsoService: QuanLyHopSoService,
    private danhmucService: QuanLyDanhMucService,)
    {
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
    // this.hopso = this.hopSoPopupService.getHopSoById()
    this.isEdit = false;
    this.loadData();
  }

  onOrganChange(organID : any){
    var params = organID;
    if(params != undefined && params !=null){
      this.hopsoService.getFontByOrganId(params)
      .subscribe((data) => {
        if (data != undefined && data.length != 0) {
            var phongs = [];
            for (const item of data) {
              var temp = { id: item.fontID, text: item.fontName }
              phongs.push(temp);
            }
            this.lstFont = phongs;
            var count =0;
            this.lstDanhMuc = [];
            this.lstOrgan.forEach(x=>{
              if(parseInt(x.id) == this.hopso.fontID){
                this.onFontChange(this.hopso.fontID);
                count++;
              }
            })
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
    if(params != undefined && params !=null){
      this.hopsoService.getTabByFontId(params)
      .subscribe((data) => {
        if (data != undefined && data.length !=0) {
          var danhmucs = [];
          for (const item of data) {
            var temp = { id: item.tabOfContID, text: item.tabOfContName }
            danhmucs.push(temp);
          }
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
  loadData() {
    this.lstDanhMuc =[];
    this.lstFont= [];
    this.lstOrgan= [];
    this.danhmucService.getAllCoQuan()
    .subscribe((result) => {
      if (result != undefined) {
        var coquans = [];
        for (var item of result.itemList) {
          var temp = { id: item.organID, text: item.tenCoQuan };
          coquans.push(temp);
        }
        this.lstOrgan = coquans;
      }
    },
    (error) => {
    }, () => {
    });
    // this.danhmucService.getAllPhong()
    //   .subscribe((result) => {
    //     if (result != undefined) {
    //       var phongs = [];
    //       for (var item of result.itemList) {
    //         var temp = { id: item.fontID, text: item.fontName };
    //         phongs.push(temp);
    //       }
    //       this.lstFont = phongs;
    //     }
    //   },
    //   (error) => {
    //     console.log(error);
    //   }, () => {
    // });
    // this.danhmucService.getAllDanhMuc()
    // .subscribe((result) => {
    //   if (result != undefined) {
    //     var danhmucs = [];
    //     for (var item of result.itemList) {
    //       var temp = { id: item.tabOfContID, text: item.tabOfContName };
    //       danhmucs.push(temp);
    //     }
    //     this.lstDanhMuc = danhmucs;
    //   }
    // },
    // (error) => {
    //   console.log(error);
    // }, () => {
    // });
    if(this.hopSoPopupService.result.item != undefined){
      this.hopso = this.hopSoPopupService.result.item;
      if(this.hopso.startDate != undefined && this.hopso.startDate !=null){
        this.hopso.stDate = this.hopso.startDate.toString().split('T')[0];
      }
      if(this.hopso.endDate != undefined && this.hopso.endDate !=null){
        this.hopso.eDate = this.hopso.endDate.toString().split('T')[0];
      }
      this.isEdit = true;
    }
  }
  clear() {
    this.activeModal.dismiss('cancel');
  
  }
  save() {
    if(this.hopso.stDate == "" || this.hopso.eDate == "" 
    || this.hopso.stDate == undefined || this.hopso.eDate == undefined 
    || this.hopso.tabOfContID == 0 || this.hopso.tabOfContID == undefined){
      this.onSaveError("Nhập đầy đủ thông tin!!!");
    }
    else{
      if(new Date(this.hopso.stDate) > new Date(this.hopso.eDate)){
        this.onSaveError("Ngày bắt đầu phải nhỏ hơn ngày kết thúc!!!");
      }
      else{
        if (this.isEdit) {
          this.hopsoService.updateHopSo(this.hopso)
            .subscribe((result) => {
              this.loadData();
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
            this.hopsoService.insertNewHopSo(this.hopso)
            .subscribe((result) => {
              this.loadData();
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
    }
  }
  onSaveSuccess(message: string) {
    this.toastr.success(message);
  }

  onSaveError(message: string){
    this.toastr.error(message);
  }

  onClose(){
    this.hopsoService.filter('Register click');
  }

  deleteFont(event) {
  }
  
  ngOnDestroy(): void {
  }
}
