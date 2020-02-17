import { Component, OnInit } from '@angular/core';
import { CoQuan, coquans } from '../../../model/co-quan.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QuanLyCoQuanPopupService } from '../quan-ly-co-quan-popup.service';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { QuanLyCoQuanService } from '../quan-ly-co-quan-service.service';
import { Select2Data } from 'ng-select2-component';
import { QuanLyCoQuanComponent } from '../quan-ly-co-quan.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-co-quan-dialog',
  templateUrl: './co-quan-dialog.component.html',
  styleUrls: ['./co-quan-dialog.component.css']
})

export class CoQuanDialogComponent implements OnInit {
  coQuan : CoQuan = new CoQuan();
  data1 = data1;
  value1 = 'CA';
  isEdit : boolean = false;
  defaultValue : string;
  data: any;

  constructor(
    public activeModal: NgbActiveModal,
    public coQuanPopupService: QuanLyCoQuanPopupService,
    public service: QuanLyCoQuanService,
    private router: Router,
  ) {
   }

  ngOnInit() {
    // console.log(this.coQuanPopupService.result.item);
    // debugger
    // console.log(this.coQuanPopupService.result.item);
    if(this.coQuanPopupService.result.item != undefined){
      this.coQuan = this.coQuanPopupService.result.item;
      this.isEdit = true;
      console.log(this.coQuan);
    }
    else {
      this.isEdit = false;
      this.defaultValue = "Chọn loại cơ quan...";
    }
    this.data = [
      {
        id: 'basic1',
        text: 'Basic 1'
      },
      {
        id: 'basic2',
        disabled: true,
        text: 'Basic 2'
      },
      {
        id: 'basic3',
        text: 'Basic 3'
      },
      {
        id: 'basic4',
        text: 'Basic 4'
      }
    ];
  }
  update1(value: string) {

  }
  clear() {
    this.activeModal.dismiss('cancel');
  }

  save() {
    if (this.isEdit) {
      this.coQuan.TinhID = 1;
      this.coQuan.XaPhuongID = 1;
      this.coQuan.HuyenID = 1;
      this.service.updateCoQuan(this.coQuan)
        .subscribe((result) => {
          console.log(result);
        },
        (error)=> {
          console.log(error);
        },
        () => {
          // do something
          this.activeModal.dismiss("Update successfully.");
        });
    }
    else {
      console.log(this.coQuan);
      this.coQuan.TinhID = 1;
      this.coQuan.XaPhuongID = 1;
      this.coQuan.HuyenID = 1;
      
      this.service.insertNewCoQuan(this.coQuan)
        .subscribe((result) => {
          console.log(result);
        },
        (error) => {
          console.log(error);
        }, () => {
          this.activeModal.dismiss("Create new successfully");
        });
    }
    
  }



}
export const data1: Select2Data = [
  {
      label: '',
      options: [
          { value: 'AK', label: 'Alaska' },
          { value: 'HI', label: 'Hawaii', disabled: true }
      ]
  },
  {
      label: 'Pacific Time Zone',
      options: [
          { value: 'CA', label: 'California' },
          { value: 'NV', label: 'Nevada' },
          { value: 'OR', label: 'Oregon' },
          { value: 'WA', label: 'Washington' }
      ]
  },
  {
      label: 'Mountain Time Zone',
      options: [
          { value: 'AZ', label: 'Arizona' },
          { value: 'CO', label: 'Colorado' },
          { value: 'ID', label: 'Idaho' },
          { value: 'MT', label: 'Montana' },
          { value: 'NE', label: 'Nebraska' },
          { value: 'NM', label: 'New Mexico' },
          { value: 'ND', label: 'North Dakota' },
          { value: 'UT', label: 'Utah' },
          { value: 'WY', label: 'Wyoming' }
      ]
  },
  {
      label: 'Central Time Zone',
      options: [
          { value: 'AL', label: 'Alabama' },
          { value: 'AR', label: 'Arkansas' },
          { value: 'IL', label: 'Illinois' },
          { value: 'IA', label: 'Iowa' },
          { value: 'KS', label: 'Kansas' },
          { value: 'KY', label: 'Kentucky' },
          { value: 'LA', label: 'Louisiana' },
          { value: 'MN', label: 'Minnesota' },
          { value: 'MS', label: 'Mississippi' },
          { value: 'MO', label: 'Missouri' },
          { value: 'OK', label: 'Oklahoma' },
          { value: 'SD', label: 'South Dakota' },
          { value: 'TX', label: 'Texas' },
          { value: 'TN', label: 'Tennessee' },
          { value: 'WI', label: 'Wisconsin' }
      ]
  },
  {
      label: 'Eastern Time Zone',
      options: [
          { value: 'CT', label: 'Connecticut' },
          { value: 'DE', label: 'Delaware' },
          { value: 'FL', label: 'Florida' },
          { value: 'GA', label: 'Georgia' },
          { value: 'IN', label: 'Indiana' },
          { value: 'ME', label: 'Maine' },
          { value: 'MD', label: 'Maryland' },
          { value: 'MA', label: 'Massachusetts' },
          { value: 'MI', label: 'Michigan' },
          { value: 'NH', label: 'New Hampshire' },
          { value: 'NJ', label: 'New Jersey' },
          { value: 'NY', label: 'New York' },
          { value: 'NC', label: 'North Carolina' },
          { value: 'OH', label: 'Ohio' },
          { value: 'PA', label: 'Pennsylvania' },
          { value: 'RI', label: 'Rhode Island' },
          { value: 'SC', label: 'South Carolina' },
          { value: 'VT', label: 'Vermont' },
          { value: 'VA', label: 'Virginia' },
          { value: 'WV', label: 'West Virginia' }
      ]
  }
];

