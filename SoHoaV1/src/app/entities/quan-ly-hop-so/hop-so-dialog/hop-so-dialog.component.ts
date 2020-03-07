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
  loadData() {
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
      console.log(error);
    }, () => {
    });
    this.danhmucService.getAllPhong()
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
    this.danhmucService.getAllDanhMuc()
    .subscribe((result) => {
      if (result != undefined) {
        var danhmucs = [];
        for (var item of result.itemList) {
          var temp = { id: item.tabOfContID, text: item.tabOfContName };
          danhmucs.push(temp);
        }
        this.lstDanhMuc = danhmucs;
      }
    },
    (error) => {
      console.log(error);
    }, () => {
    });
    if(this.hopSoPopupService.result.item != undefined){
      this.hopso = this.hopSoPopupService.result.item;
      this.isEdit = true;
    }
  }
  clear() {
    this.activeModal.dismiss('cancel');
  
  }
  save() {
    if (this.isEdit) {
      this.hopsoService.updateHopSo(this.hopso)
        .subscribe((result) => {
          console.log(result);
          this.loadData();
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
        this.hopsoService.insertNewHopSo(this.hopso)
        .subscribe((result) => {
          this.loadData();
        },
        (error) => {
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
