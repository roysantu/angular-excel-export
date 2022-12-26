import { Component, EventEmitter, Output } from '@angular/core';

import { read, utils, writeFile } from 'xlsx';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css'],
})
export class UploadFileComponent {
  fileData: any[] = [];
  headers: string[] =[];
  rowData:string[]=[];
  allRowData: any[]=[];
  @Output() onHeaderExtractedEvent = new EventEmitter<string[]>();
  @Output() onDataExtractedEvent = new EventEmitter<any[]>();

  handleImport($event: any) {
    // console.log($event);
    const files = $event.target.files;
    if (files.length) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (event: any) => {
        const wb = read(event.target.result);
        const sheets = wb.SheetNames;

        if (sheets.length) {
          const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
          this.fileData = rows;
        }
      };
      reader.readAsArrayBuffer(file);
    }
  }
  handleExport() {
    
    console.log(this.fileData)
    // const headings = [['name', 'position', 'weight']];
    // const wb = utils.book_new();
    // const ws: any = utils.json_to_sheet([]);
    // utils.sheet_add_aoa(ws, headings);
    // utils.sheet_add_json(ws, this.fileData, { origin: 'A2', skipHeader: true });
    // utils.book_append_sheet(wb, ws, 'Report');
    // writeFile(wb, 'Movie Report.xlsx');
    // Get headers - assuming first row is header of sheet#1
    for (let prop in this.fileData[0]) {
      // console.log( prop );
      this.headers.push(prop);
    }
    // Get data for headers identified 
    // console.log('.......>>>>>>>>>>>>>>>>', this.fileData[0][this.headers[0]])
    this.fileData.forEach(element => {
      this.rowData = [];
      this.headers.forEach(head => {
        this.rowData.push(element[head]);
      })
      this.allRowData.push(this.rowData);
      
    });
    console.log('Extracted Data array >>>>>>>>>', this.allRowData)
    this.onHeaderExtractedEvent.emit(this.headers);
    this.onDataExtractedEvent.emit(this.allRowData);
  }
}
