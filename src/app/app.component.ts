import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'excel-python';
  excelHeaders: string[] =[]; 
  excelData: any[] =[];

  onHeaderExtracted(headers: string[]) {
    this.excelHeaders=headers;
    // this.excelData=
    // console.log('From app comp>>>>>>>>',this.excelHeaders);
  }
  onAllDataExtracted(allData: []) {
    this.excelData=allData;
    // this.excelData=
    // console.log('From app comp>>>>>>>>',this.excelData);
  }
}
