import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { PdfService } from './pdf.service';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent {
  iframetab:any=false;
  src:any;
  newObj :any= {
    StudentId: '',
    Name: '',
    Roll: '',
    Birthday: '',
  };
  PDFGEN:any=false;
  constructor(private myApiService: PdfService,private domSanitizer: DomSanitizer) {
    // Assign the data to the data source for the table to render
  }
  print(data:any){
    this.myApiService.postpdfData(data).subscribe(
      (result: any) => {
        this.src=this.domSanitizer.bypassSecurityTrustResourceUrl("data:application/pdf;base64,"+result.base64);
        console.log(this.src);
        this.iframetab=true;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
