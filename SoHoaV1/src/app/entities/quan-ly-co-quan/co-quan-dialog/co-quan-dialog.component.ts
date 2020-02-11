import { Component, OnInit } from '@angular/core';
import { CoQuan, coquans } from '../../../model/co-quan.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { QuanLyCoQuanPopupService } from '../quan-ly-co-quan-popup.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import {startWith, map} from 'rxjs/operators';

export interface StateGroup {
  letter: string;
  names: string[];
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};

@Component({
  selector: 'app-co-quan-dialog',
  templateUrl: './co-quan-dialog.component.html',
  styleUrls: ['./co-quan-dialog.component.css']
})

export class CoQuanDialogComponent implements OnInit {
  coQuan = new CoQuan();

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three', 'fdsfsfd', 'fdsfsf', 'fdsfsdf'];
  filteredOptions: Observable<string[]>;

  constructor(
    public activeModal: NgbActiveModal,
    public coQuanPopupService: QuanLyCoQuanPopupService,
    private _formBuilder: FormBuilder
  ) {

   }

  ngOnInit() {
  //  this.coQuan = this.coQuanPopupService.getCoQuanById();
  this.filteredOptions = this.myControl.valueChanges.pipe(
    startWith(''),
    map(value => this._filter(value))
  );
  console.log(this.filteredOptions);
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  clear() {
    this.activeModal.dismiss('cancel');
  
  }
  save(){
    // if (this.coQuan.id && this.coQuan.id != undefined) {
    //   for(let i = 0; i < coquans.length; i++) {
    //     if (coquans[i].id == this.coQuan.id) {
    //       coquans[i] = this.coQuan;
    //       break;
    //     }
    //   }
    // }
    // else {
    //   let id = coquans.length;
    //   this.coQuan.id = id + 1;
    //   coquans.push(this.coQuan);
    // }
    // this.clear();
    
  }


}
