import { Component, OnInit } from '@angular/core';
import { CoQuan } from '../../model/co-quan.model';
import { coquans } from '../../model/co-quan.model';

@Component({
  selector: 'app-quan-ly-co-quan',
  templateUrl: './quan-ly-co-quan.component.html',
  styleUrls: ['./quan-ly-co-quan.component.css']
})
export class QuanLyCoQuanComponent implements OnInit {
  coquans : CoQuan[];
  constructor() { }

  ngOnInit() {
    this.coquans = coquans
  }

}
