import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quan-ly-chu-ky-so',
  templateUrl: './quan-ly-chu-ky-so.component.html',
  styleUrls: ['./quan-ly-chu-ky-so.component.css']
})
export class QuanLyChuKySoComponent implements OnInit {
  imgSrc: string | ArrayBuffer;
  constructor() { }

  ngOnInit() {
  }
  onFileSelected() {
    let $img: any = document.querySelector('#file');
  
    if (typeof (FileReader) !== 'undefined') {
      let reader = new FileReader();
      reader.readAsArrayBuffer($img.files[0]);
      
      reader.onload = (e: any) => {
        this.imgSrc = e.target.result;
    console.log(this.imgSrc);

      };
  
    }
    
  }
}
