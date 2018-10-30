import { Component, OnInit, Inject } from '@angular/core';
import { EProfileService } from '../apiservice.service';
import { importExpr } from '@angular/compiler/src/output/output_ast';
import { AddSkillsModel } from '../models/addSkills.model';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { throwMatDialogContentAlreadyAttachedError } from '../../../node_modules/@angular/material';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser/src/dom/events/hammer_gestures';
import { Allskils } from '../allskils';
import {LocalStorageService} from 'angular-2-local-storage';
import { coreSkillsModel } from '../models/coreSkill.model';
import { core } from '@angular/compiler';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { DialogComponent } from "../dialog/dialog.component";




@Component({
  selector: 'app-tech-skill-list',
  templateUrl: './tech-skill-list.component.html',
  styleUrls: ['./tech-skill-list.component.css']
})
export class TechSkillListComponent implements OnInit {
  skillLists: any;
  alertFlag : boolean = false;
  AllSkills: any;
  allskilldetails:any;
  spinnerFlag: boolean;
  validationFlag : boolean;
  errorMessage;
  submitFlag : boolean;
  allskillJson;
  addedSkill:AddSkillsModel[];
  coreskills:any;
  dskillIndex: any;
  dskillParentIndex: any;
  searchList: any;
  otherSkillids: number[] = [];
  tempPostSkills: Allskils;
  tempCoreSkills: coreSkillsModel;
  renderedAddedSkill: AddSkillsModel[];
  preStoredData : Allskils;
  preStoredMap : any[];
  preStoredSkill : AddSkillsModel[];
  skipCount : any;
  employeeDetail : any;
  loginDetail : any;
  tempAllSkills: Allskils;
  duplicateFlag : boolean = false;




  constructor(private apiservice:EProfileService, private dialog: MatDialog) { 
    this.addedSkill = [];
    this.AllSkills = {} as Allskils;
  }

  ngOnInit() {
    
    this.validationFlag = true;
    this.renderedAddedSkill=[];
    this.otherSkillids = [];
    this.preStoredSkill = [];
    this.spinnerFlag = false;
    this.submitFlag = false;
   
    this.apiservice.getAllSkills().subscribe(
      result => {
        this.AllSkills=result;
        this.tempAllSkills = result;
      },
     
      error => this.errorMessage = <any>error);
   
      this.apiservice.employeeDetail.subscribe( result => {
        this.employeeDetail = result.employeeDetails;
        if(result.loginDetail)
        {
          this.loginDetail = result.loginDetail[0];
        }
      if(this.employeeDetail){
        this.searchList = {
          "insightId": this.employeeDetail.Insight_Id,
          "searchKey": ""
        };
      }
      else{
        this.searchList = {};
      }
      
      this.apiservice.getEmployeeList(this.searchList).subscribe(result => {
        this.preStoredData = result[0];
       if(this.preStoredData){
          for(var i=0; i < this.preStoredData.skillLists.length ; i++ ){
            
            if(this.preStoredData.skillLists[i].skill_id != 0){
              let skillItem = {} as AddSkillsModel;
              skillItem.skillId = this.preStoredData.skillLists[i].skill_id;
              skillItem.skillName = this.preStoredData.skillLists[i].skill_Name;
              var tempLoop = this.preStoredData.skillLists[i].coreSkills.length;
              this.coreskills = [];
              for(var j=0; j < tempLoop; j++){
                 this.tempCoreSkills = {} as any;
                 if(this.preStoredData.skillLists[i].coreSkills[j].core_Skill_Experience_in_Months != 0){
                  this.tempCoreSkills.core_Skill_Experience_in_Months =   Math.floor(this.preStoredData.skillLists[i].coreSkills[j].core_Skill_Experience_in_Months%12) || 0;
                  this.tempCoreSkills.core_Skill_Experience_in_Years = Math.floor(this.preStoredData.skillLists[i].coreSkills[j].core_Skill_Experience_in_Months / 12) || 0;
                 }
                 else{
                  this.tempCoreSkills.core_Skill_Experience_in_Months =   "Select";
                  this.tempCoreSkills.core_Skill_Experience_in_Years = "Select";
                 }
                 
                 this.tempCoreSkills.core_Skill_Name = this.preStoredData.skillLists[i].coreSkills[j].core_Skill_Name;
                 this.tempCoreSkills.core_Skill_rating = this.preStoredData.skillLists[i].coreSkills[j].core_Skill_rating || "Select";
                 this.tempCoreSkills.core_skillid = this.preStoredData.skillLists[i].coreSkills[j].core_skillid;
                 this.tempCoreSkills.isSelected = true;
                 this.tempCoreSkills.newSkillSetIds = this.preStoredData.skillLists[i].coreSkills[j].newSkillSetIds;
                 this.coreskills.push(this.tempCoreSkills);
  
                 this.AllSkills.skillLists.forEach( (data) => {
                  if(data.skill_id == skillItem.skillId){
                      data.coreSkills.forEach(subData =>{
                        if(subData.core_skillid == this.tempCoreSkills.core_skillid){
                          subData.selected = true;
                        }
                      });
                  };
                });
              }
              skillItem.coreskills = this.coreskills;
              this.renderedAddedSkill.push(skillItem);
              
            }

            else{
                var tempLoop = this.preStoredData.skillLists[i].coreSkills.length;
         
            for(var j=0; j < tempLoop; j++){
              let skillItem = {} as AddSkillsModel;
              skillItem.skillId = this.preStoredData.skillLists[i].skill_id;
              skillItem.skillName = this.preStoredData.skillLists[i].skill_Name;
              this.coreskills = [];
               this.tempCoreSkills = {} as coreSkillsModel;
               if(this.preStoredData.skillLists[i].coreSkills[j].core_Skill_Experience_in_Months != 0){
                this.tempCoreSkills.core_Skill_Experience_in_Months =   Math.floor(this.preStoredData.skillLists[i].coreSkills[j].core_Skill_Experience_in_Months%12) || 0;
                this.tempCoreSkills.core_Skill_Experience_in_Years = Math.floor(this.preStoredData.skillLists[i].coreSkills[j].core_Skill_Experience_in_Months / 12) || 0;
               }
               else{
                this.tempCoreSkills.core_Skill_Experience_in_Months =   "Select";
                this.tempCoreSkills.core_Skill_Experience_in_Years = "Select";
               }
               this.tempCoreSkills.core_Skill_Name = this.preStoredData.skillLists[i].coreSkills[j].core_Skill_Name;
               this.tempCoreSkills.core_Skill_rating = this.preStoredData.skillLists[i].coreSkills[j].core_Skill_rating || 0;
               this.tempCoreSkills.core_skillid = this.preStoredData.skillLists[i].coreSkills[j].core_skillid;
               this.tempCoreSkills.isSelected = true;
               this.tempCoreSkills.newSkillSetIds = this.preStoredData.skillLists[i].coreSkills[j].newSkillSetIds;
               this.coreskills.push(this.tempCoreSkills);
               skillItem.coreskills = this.coreskills;
               this.renderedAddedSkill.push(skillItem);
            }

          }}

         this.techSkillSubmit();
        }
       
      });
      if(this.employeeDetail){
        this.apiservice.getSkipCount(this.employeeDetail.Employee_Id).subscribe(result =>{
          this.skipCount = result.skipCount || 0;
        })
      }
    
  })

}
 

selectedRoles = [];

skipNow(){
let payload =  {
              "employeeId":this.employeeDetail.Employee_Id,
              "skipCount":Number(this.skipCount) +1
                }
    this.apiservice.postSkipCount(payload).subscribe(result=>{
    let status =  result.status;
    if(status == "success"){
    this.skipCount = this.skipCount +1;
     };
  })
}

skipModal() {
  const dialogConfig = new MatDialogConfig();
 dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  let flag;
  if(this.skipCount == 0)
  flag = 2
  else if(this.skipCount == 1)
  flag = 1
  else
  flag = 0;
  dialogConfig.data = {
  id: 1,
  description :"No of skips left : "+ flag,
  title : "Confirm Skip!"
  };
  const dialogRef = this.dialog.open(DialogComponent, dialogConfig);
  dialogRef.afterClosed().subscribe(result => {
  if(result){
    this.skipNow();
   // window.location.href = "http://172.16.105.151:8080/router.html";
  }
});
}

addOtherSkill(){
  

  
  let otherIndex = this.tempAllSkills.skillLists.findIndex(skills => skills.skill_id == 0);
  let otherCoreSkills:any = {};

  let skillItem = {} as any;
    skillItem.skillId = 0;
    skillItem.skillName = "Others";
    otherCoreSkills.core_Skill_rating = 'Select';
    otherCoreSkills.core_Skill_Experience_in_Months = 'Select';
    otherCoreSkills.core_Skill_Experience_in_Years = 'Select';
    otherCoreSkills.selected = true;
    this.coreskills = [];
      this.coreskills.push(otherCoreSkills);
      skillItem.coreskills = this.coreskills ;
      this.renderedAddedSkill.push(skillItem);
      delete skillItem.coreSkills;
      skillItem.coreSkills = this.coreskills;
      this.AllSkills.skillLists.push(skillItem);
}


checkValue(event, skill, core) {
  let coreskill = {} as any;
  let parentIndex = this.tempAllSkills.skillLists.findIndex(skills=> skills.skill_id == skill.skill_id);
  let childIndex = this.tempAllSkills.skillLists[parentIndex].coreSkills.findIndex(coreSkills => coreSkills.core_skillid == core.core_skillid);
  if(skill.skill_id != 0){
    
    this.AllSkills.skillLists[parentIndex].coreSkills[childIndex].selected = true;
  }
  if (event.target.checked) {
    let skillItem = {} as AddSkillsModel;
    skillItem.skillId = this.tempAllSkills.skillLists[parentIndex].skill_id;
    skillItem.skillName = this.tempAllSkills.skillLists[parentIndex].skill_Name;

    coreskill.core_Skill_rating = 'Select';
    coreskill.core_Skill_Name = this.tempAllSkills.skillLists[parentIndex].coreSkills[childIndex].core_Skill_Name;
    coreskill.core_skillid = this.tempAllSkills.skillLists[parentIndex].coreSkills[childIndex].core_skillid;
    coreskill.core_Skill_Experience_in_Months = 'Select';
    coreskill.core_Skill_Experience_in_Years = 'Select';
    coreskill.defaultCoreSkills = this.tempAllSkills.skillLists[parentIndex].coreSkills;
    coreskill.selected = true;
    let selectedSkill = this.renderedAddedSkill.find(skillFilter => {
    return skillFilter.skillId === skill.skill_id && skillFilter.skillId!=0 });
  
 
    if (!selectedSkill) {
      this.coreskills = [];
      this.coreskills.push(coreskill);
      skillItem.coreskills = this.coreskills ;
      this.renderedAddedSkill.push(skillItem);
    }
    else {
      let index = this.renderedAddedSkill.findIndex(skills => skills.skillId == skill.skill_id);
      this.renderedAddedSkill[index].coreskills.push(coreskill);
   }
    
  }

  else {      
    if( skill.skill_id != 0){
      let unselectedskill = this.renderedAddedSkill.find(unselectedskill => unselectedskill.skillId === skill.skill_id);
      let index = this.renderedAddedSkill.indexOf(unselectedskill);
      let parentIndex = this.renderedAddedSkill[index].coreskills.indexOf(coreskill);
      this.renderedAddedSkill[index].coreskills.splice(parentIndex,1);
      if (this.renderedAddedSkill[index].coreskills.length <= 0) {
        let index = this.renderedAddedSkill.indexOf(unselectedskill);
        this.renderedAddedSkill.splice(index, 1); 
      }
    }

    else{
      let unselectedskill = this.renderedAddedSkill.find(unselectedskill => (unselectedskill.skillId === skill.skill_id)&&(unselectedskill.coreskills[0].core_Skill_Name == coreskill.core_Skill_Name));
      let index = this.renderedAddedSkill.indexOf(unselectedskill);
      this.renderedAddedSkill.splice(index, 1); 
    }
   }
}

techSkillSubmit(){
  this.addedSkill = this.renderedAddedSkill;
 }


 onSubmit(renderedAddedSkill){
   this.validator();
   if(this.validationFlag == true && this.duplicateFlag == false){
    this.openModal();
   }
 }
  
//  let parentIndex = this.tempAllSkills.skillLists.findIndex(skills=> skills.skill_id == skill.skill_id);
//  let childIndex = this.tempAllSkills.skillLists[parentIndex].coreSkills.findIndex(coreSkills => coreSkills.core_skillid == core.core_skillid);
//  if(skill.skill_id != 0){
//    this.AllSkills.skillLists[parentIndex].coreSkills[childIndex].selected == true;
//  }

onDeleteSkillsRow(skills, coreSkills,id, newSkillSetIds, parentIndex) {

  this.duplicateFlag = false;

  if(skills.skillId != 0){
    console.log('executing');

    let masterIndex = this.renderedAddedSkill.findIndex(skillFilter => {
      return skillFilter.skillId == skills.skillId;
    });
    let childIndex = this.renderedAddedSkill[masterIndex].coreskills.findIndex(coreskillFilter => {
      return coreskillFilter.core_skillid == id;
    });
    
    this.renderedAddedSkill[masterIndex].coreskills.splice(childIndex, 1);
    for (var e in this.AllSkills.skillLists) {
      for (var d in this.AllSkills.skillLists[e].coreSkills) {
        if (this.AllSkills.skillLists[e].coreSkills[d].core_skillid == id) {
          console.log("executed");
          this.AllSkills.skillLists[e].coreSkills[d].selected = false;
          console.log(this.AllSkills.skillLists[e]);
        }
      }
    };
  }

  else{
    let masterIndex, i ;
    
    if(newSkillSetIds != null){
      for(i=0; i<this.renderedAddedSkill.length;i++){
        if(this.renderedAddedSkill[i].coreskills[0].newSkillSetIds == newSkillSetIds){
          masterIndex = i;
          break;
          }
        }
        let payload = {
          "newSkillSetIds":this.renderedAddedSkill[masterIndex].coreskills[0].newSkillSetIds,
          "isActiveFlag":"0",
          "otherFlag":"1"
        }
        this.apiservice.deleterOtherSkills(payload).subscribe(res=>{
          this.ngOnInit();
        })
    }


    else{
      for(i=0; i<this.renderedAddedSkill.length;i++){
        if(this.renderedAddedSkill[i].coreskills.length > 0){
          if(this.renderedAddedSkill[i].coreskills[0].core_Skill_Name == coreSkills[0].core_Skill_Name){
            masterIndex = i;
            break;
            }
        }
    }
    for (var e in this.AllSkills.skillLists) {
      for (var d in this.AllSkills.skillLists[e].coreSkills) {
        if (this.AllSkills.skillLists[e].skill_id == 0) {
          this.AllSkills.skillLists[e].coreSkills[0].selected = false;
        }
      }
    };
    this.renderedAddedSkill.splice(masterIndex, 1);
  }
}

}


openModal() {
  const dialogConfig = new MatDialogConfig();
 dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.data = {
  id: 1,
  description :"You are about to submit the Technical Skills. Would you like to continue",
  title : "Confirm Submission!"
  };
  const dialogRef = this.dialog.open(DialogComponent, dialogConfig);
  dialogRef.afterClosed().subscribe(result => {
  if(result){
    this.submitFlag = true;
    this.onSaveSkillslist();
  }
});
}


validator(){
  this.validationFlag = false;
  this.alertFlag = true;
  if (this.renderedAddedSkill.length > 0){
    let skipper = false;
    let k = this.renderedAddedSkill.length -1;
    if(k==0 && (this.renderedAddedSkill[k].coreskills.length <= 0)){
      this.validationFlag = true;
    }
    for(let m=k; m >= 0; m--){
    if(this.renderedAddedSkill[m].coreskills.length <= 0){
      continue
    }
    else{
      k=m;
      break;
    }
  }
    for(let i=0; i<this.renderedAddedSkill.length ; i++){
      for( let j=0; j<this.renderedAddedSkill[i].coreskills.length; j++){
        let l = this.renderedAddedSkill[i].coreskills.length - 1;
        if((this.renderedAddedSkill[i].coreskills[j].core_Skill_rating != "Select") &&  (this.renderedAddedSkill[i].coreskills[j].core_Skill_Experience_in_Months != "Select") && this.renderedAddedSkill[i].coreskills[j].core_Skill_Experience_in_Years != "Select" && this.renderedAddedSkill[i].coreskills[j].core_Skill_Name != null){
          if(i == k){
            if((this.renderedAddedSkill[k].coreskills[l].core_Skill_rating != "Select") &&  (this.renderedAddedSkill[k].coreskills[l].core_Skill_Experience_in_Months != "Select") && this.renderedAddedSkill[k].coreskills[l].core_Skill_Experience_in_Years != "Select" && this.renderedAddedSkill[i].coreskills[j].core_Skill_Name != null){
              this.validationFlag = true;
            }
          }
          continue;
        }
        skipper = true;
        break;
      }
      if(skipper == true){
        break;
      }
    }
 }
}

alert(coreskill?, skills?){
  this.alertFlag = false;
  let duplicated: any[] = [];
  if(skills.skillId == 0){
   
    this.tempAllSkills.skillLists.forEach(parentSkills =>{
      let temp2 = parentSkills.skill_Name || " ";
      let temp3 = coreskill.core_Skill_Name || "undefined"
      if(temp2 == temp3.toLocaleLowerCase()){
          duplicated.push(parentSkills);
       }
      else{
              parentSkills.coreSkills.forEach(coreskills =>{
              let temp = coreskills.core_Skill_Name || " ";
              if(temp.toLocaleLowerCase() == temp3.toLocaleLowerCase()){
                  duplicated.push(parentSkills);
                  return;
               }
          })
      }
  })

  if(duplicated.length > 1){
    this.duplicateFlag = true;
  }
  else{
    this.duplicateFlag = false;
  }
  }

}

onSaveSkillslist() {
  
  this.spinnerFlag = true;
  this.renderedAddedSkill.forEach(parentSkills => {
    let coreSkillIds:any = [];
    let coreSkillRatings: any = [];
    let coreExpInMonths: any = [];
    let newSkillSetIds: any = [];
    let newSkillName : any = [];
      parentSkills.coreskills.forEach(skills => {
        newSkillName.push(skills.core_Skill_Name);
        coreSkillIds.push(skills.core_skillid || 0);
        coreSkillRatings.push(skills.core_Skill_rating);
        coreExpInMonths.push((Number(skills.core_Skill_Experience_in_Years)*12+(Number(skills.core_Skill_Experience_in_Months))) || 0);
        newSkillSetIds.push(skills.newSkillSetIds || 0);
      });
      
      if(parentSkills.skillName == "Others"){
        parentSkills.coreSkillIds = coreSkillIds[0].toString();
        parentSkills.coreSkillRatings = coreSkillRatings[0].toString();
        parentSkills.coreExpInMonths = coreExpInMonths[0].toString();
        parentSkills.newSkillSetIds = newSkillSetIds[0].toString();
        parentSkills.coreSkillName = newSkillName[0];
        parentSkills.isActiveFlag = "1";
      }
      else{
        parentSkills.coreSkillIds = coreSkillIds.join("~");
        parentSkills.coreSkillRatings = coreSkillRatings.join("~");
        parentSkills.coreExpInMonths = coreExpInMonths.join("~");

        parentSkills.isActiveFlag = "1";
        parentSkills.newSkillSetIds = newSkillSetIds.join("~");
      }
      parentSkills.insightId = this.employeeDetail.Insight_Id;
      parentSkills.employeeId = this.employeeDetail.Employee_Id;
      parentSkills.skillId = parentSkills.skillId.toString();
  });
  
     this.tempCoreSkills = [{}] as any;
   this.renderedAddedSkill.forEach((parentSkills,index) => {
     this.tempCoreSkills[index] = parentSkills.coreskills
      delete parentSkills.coreskills;
   })
     
     this.apiservice.postAddCoreSkills({skill: this.renderedAddedSkill}).subscribe(
     result => {
       this.renderedAddedSkill.forEach((parentSkills,index) => {
        parentSkills.coreskills = this.tempCoreSkills[index];
       })
       this.renderedAddedSkill = this.renderedAddedSkill.filter((parentSkills)=>{
         return parentSkills.coreSkillIds !== "";
       })
       this.spinnerFlag = false;
       if(this.submitFlag == true){
         window.location.href = "http://172.16.105.151:8080/router.html";
       }
       else{
        this.ngOnInit();
       }
     },
     error => this.errorMessage = <any>error);
}
  
}
