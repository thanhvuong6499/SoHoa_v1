import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { FormBuilder, FormGroup, FormControl, Validators, CheckboxRequiredValidator } from '@angular/forms';
import { Observable } from 'rxjs';
import {startWith, map} from 'rxjs/operators';
import { User } from '../../../model/user.model';

export interface StateGroup {
  letter: string;
  names: string[];
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};

@Component({
  selector: 'app-nguoi-dung-dialog',
  templateUrl: './nguoi-dung-dialog.component.html',
  styleUrls: ['./nguoi-dung-dialog.component.css']
})
export class NguoiDungDialogComponent implements OnInit {

  user: User = new User();

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three', 'fdsfsfd', 'fdsfsf', 'fdsfsdf'];
  filteredOptions: Observable<string[]>;
  create: boolean = false;
  edit: boolean = false;
  formGroup: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private _formBuilder: FormBuilder
  ) {
      
   }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    this.user.roles = "1";
    this.user.Status = 0;

    // form
    // this.formGroup = this._formBuilder.group({
    //   UserName: ['', Validators.required],
    //   Password: ['', Validators.required],
    //   checkArray: [this._formBuilder.array([])]
    // });
  }

  public get f() {
    return this.formGroup.value;
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  clear() {
    this.activeModal.dismiss('cancel');
  }
  save(event){
    // do something
    console.log(this.user);
  }

  onChangeCreateRole(value: boolean) {
    this.user.userrole.create = value;
    if (value == true) {
      this.edit = true;
    }
    else {
      this.edit = false;
    }
  }

  onChangeEditRole(value : boolean) {
    this.user.userrole.edit = value;
    if(value == true) {
      this.create = true;
    }
    else {
      this.create = false;
    }
  }
}
