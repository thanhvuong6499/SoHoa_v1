import { Component, OnInit } from '@angular/core';
import { HoSo } from '../../model/ho-so.model';
import { hosos } from '../../model/ho-so.model';

@Component({
  selector: 'app-quan-ly-ho-so',
  templateUrl: './quan-ly-ho-so.component.html',
  styleUrls: ['./quan-ly-ho-so.component.css']
})
export class QuanLyHoSoComponent implements OnInit {
  hosos : HoSo[];
  constructor() { }

  ngOnInit() {
    this.hosos = hosos;
  }

}
