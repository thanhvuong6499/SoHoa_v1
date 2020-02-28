import { Component, OnInit } from '@angular/core';
import { PDFSource } from 'ng2-pdf-viewer';

@Component({
  selector: 'app-van-ban-pdf',
  templateUrl: './van-ban-pdf.component.html',
  styleUrls: ['./van-ban-pdf.component.css']
})
export class VanBanPdfComponent implements OnInit {
  pdfSrc: string | PDFSource | ArrayBuffer = '../../assets/test.pdf';
  constructor() { }

  ngOnInit() {
  }

  onFileSelected() {
    let $img: any = document.querySelector('#file');
  
    if (typeof (FileReader) !== 'undefined') {
      let reader = new FileReader();
  
      reader.onload = (e: any) => {
        this.pdfSrc = e.target.result;
      };
  
      reader.readAsArrayBuffer($img.files[0]);
    }
  }
}
