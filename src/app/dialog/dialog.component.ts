import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogModule, MatButtonModule} from "@angular/material";
import { MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  description : string;
  title: string;
  constructor( @Inject(MAT_DIALOG_DATA) public data: any ) { 
    this.description = data.description;
    this.title = data.title;
  }

  ngOnInit() {
  }

}
