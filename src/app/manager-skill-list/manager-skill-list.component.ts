import { Component, OnInit } from '@angular/core';
import { EProfileService } from '../apiservice.service';
import { importExpr } from '@angular/compiler/src/output/output_ast';
import { Allskils } from '../allskils';
import {MatCheckboxModule} from '@angular/material/checkbox';



@Component({
  selector: 'app-manager-skill-list',
  templateUrl: './manager-skill-list.component.html',
  styleUrls: ['./manager-skill-list.component.css']
})
export class ManagerSkillListComponent implements OnInit {

  constructor(private apiservice:EProfileService) { }

  searchList:any;
  reporteesList : any;
  params:any;
  body:any;

  ngOnInit() {
  }

  getEmployeeList() {
    this.searchList = {
      "insightId": 'kalpana_pr',
      //"insightId": 'THANGAPRAKASH_A',
      "searchKey": null
    };
    
    this.apiservice.getEmployeeList(this.searchList).subscribe(result => {
      console.log(result);
      this.reporteesList = result;
    });
  }


} 






  
