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
  techskillList = false;
  AllSkills: Allskils;
  allskilldetails:any;
  spinnerFlag: boolean;
  errorMessage;
  submitFlag : boolean;
  allskillJson;
  addedSkill:AddSkillsModel[];
  coreskills:any;
  dskillIndex: any;
  dskillParentIndex: any;
  searchList: any;
  tempPostSkills: Allskils;
  tempCoreSkills: coreSkillsModel;
  renderedAddedSkill: AddSkillsModel[];
  preStoredData : Allskils;
  preStoredMap : any[];
  preStoredSkill : AddSkillsModel[];


  constructor(private apiservice:EProfileService, private storage: LocalStorageService, private dialog: MatDialog) { 
    this.addedSkill = [];
    this.AllSkills = {} as Allskils;
    //this.AllSkills.skillLists = [];
  }
  
  ngOnInit() {
    this.techskillList=false;
    this.getAllSkills();
    this.renderedAddedSkill=[];
    this.preStoredSkill = [];
    this.spinnerFlag = false;
    this.submitFlag = false;
    this.apiservice.getAllSkills().subscribe(
      result => {
       //console.log(result);
        this.AllSkills=result;
      },
     
      error => this.errorMessage = <any>error);
   
      this.searchList = {
        "insightId": '',
        "searchKey": '104476'
      };
      
      this.apiservice.getEmployeeList(this.searchList).subscribe(result => {
        this.preStoredData = result[0];
       if(this.preStoredData){
          for(var i=0; i < this.preStoredData.skillLists.length ; i++ ){
            let skillItem = {} as AddSkillsModel;
            skillItem.skillId = this.preStoredData.skillLists[i].skill_id;
            skillItem.skillName = this.preStoredData.skillLists[i].skill_Name;
            var tempLoop = this.preStoredData.skillLists[i].coreSkills.length;
            this.coreskills = [];
            for(var j=0; j < tempLoop; j++){
               //console.log("correskillexp",this.preStoredData.skillLists[i].coreSkills[j].core_Skill_Experience_in_Months);
               this.tempCoreSkills = {} as coreSkillsModel;
               this.tempCoreSkills.core_Skill_Experience_in_Months =  (this.preStoredData.skillLists[i].coreSkills[j].core_Skill_Experience_in_Months%12);
               this.tempCoreSkills.core_Skill_Experience_in_Years = Math.floor(this.preStoredData.skillLists[i].coreSkills[j].core_Skill_Experience_in_Months / 12);
               this.tempCoreSkills.core_Skill_Name = this.preStoredData.skillLists[i].coreSkills[j].core_Skill_Name;
               this.tempCoreSkills.core_Skill_rating = this.preStoredData.skillLists[i].coreSkills[j].core_Skill_rating;
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
         this.techSkillSubmit();
         console.log(this.renderedAddedSkill);

        // this.preStoredMap.forEach((data, index)=>{
        //   this.preStoredSkill[index].skillId = data.skill_id;
        //   this.preStoredSkill[index].skillName = data.skill_Name;
        //   this.preStoredSkill[index].coreskills = data.coreSkills
        // });
        }
       
      });
    }

  
 
  getAllSkills(){
   
}
selectedRoles = [];


checkValue(event, skill, coreskill) {
    
  if (event.target.checked) {
    let skillItem = {} as AddSkillsModel;
    skillItem.skillId = skill.skill_id;
    skillItem.skillName = skill.skill_Name;

    coreskill.core_Skill_rating = 'Select';
    coreskill.core_Skill_Experience_in_Months = 0;
    coreskill.core_Skill_Experience_in_Years = 0;
    coreskill.defaultCoreSkills = skill.coreSkills;
    coreskill.selected = true;
    let selectedSkill = this.renderedAddedSkill.find(skillFilter => {
       return skillFilter.skillId === skill.skill_id});
  
    //this selectedskill is localmap of addedskill of same category
    if (!selectedSkill) {
      this.coreskills = [];
      this.coreskills.push(coreskill);
      //console.log(this.coreskills);
      skillItem.coreskills = this.coreskills ;
      this.renderedAddedSkill.push(skillItem);
    }
    else {
      let index = this.renderedAddedSkill.findIndex(skills => skills.skillId == skill.skill_id);
      this.renderedAddedSkill[index].coreskills.push(coreskill);
   }
    
  }

  else {      
    let unselectedskill = this.renderedAddedSkill.find(unselectedskill => unselectedskill.skillId === skill.skill_id);
    //let unselectedcore = unselectedskill.coreskills as any[];
    //let unselectedindex = unselectedskill.coreskills.indexOf(coreskill);
    //unselectedcore.splice(unselectedindex, 1);

    let index = this.renderedAddedSkill.indexOf(unselectedskill);
    let parentIndex = this.renderedAddedSkill[index].coreskills.indexOf(coreskill);
    this.renderedAddedSkill[index].coreskills.splice(parentIndex,1);

    if (this.renderedAddedSkill[index].coreskills.length <= 0) {
      let index = this.renderedAddedSkill.indexOf(unselectedskill);
      this.renderedAddedSkill.splice(index, 1); 
    }

   }
   //console.log(this.renderedAddedSkill); 
}

techSkillSubmit(){
  this.techskillList = true;
  this.addedSkill = this.renderedAddedSkill;
  console.log(this.renderedAddedSkill);
 }

 
 skillModalShow(){
   
 }



 onSubmit(renderedAddedSkill){
  this.openModal();
  //this.onSaveSkillslist();
  // this.spinnerFlag = true;
  // this.renderedAddedSkill.forEach(parentSkills => {
  //   let coreSkillIds:any = [];
  //   let coreSkillRatings: any = [];
  //   let coreExpInMonths: any = [];
  //   let newSkillSetIds: any = [];
  //     parentSkills.coreskills.forEach(skills => {
  //       coreSkillIds.push(skills.core_skillid);
  //       coreSkillRatings.push(skills.core_Skill_rating);
  //       coreExpInMonths.push(Number(skills.core_Skill_Experience_in_Years)*12+(Number(skills.core_Skill_Experience_in_Months)));
  //       newSkillSetIds.push(skills.newSkillSetIds || 0);
  //     });
  //     parentSkills.coreSkillIds = coreSkillIds.join("~");
  //     parentSkills.coreSkillRatings = coreSkillRatings.join("~");
  //     parentSkills.coreExpInMonths = coreExpInMonths.join("~");
  //     parentSkills.newSkillSetIds = newSkillSetIds.join("~");
  //     parentSkills.isActiveFlag = "1";
  //     parentSkills.insightId = "abdulkhadir_t";
  //     parentSkills.employeeId = "100396";
  //     parentSkills.skillId = parentSkills.skillId.toString();
  // });
  
  //    this.tempCoreSkills = [{}] as any;
  //  this.renderedAddedSkill.forEach((parentSkills,index) => {
  //    this.tempCoreSkills[index] = parentSkills.coreskills
  //     delete parentSkills.coreskills;
  //  })
  // //console.log({skill: this.renderedAddedSkill});
  //    this.apiservice.postAddCoreSkills({skill: this.renderedAddedSkill}).subscribe(
  //    result => {
  //      console.log('result',result);
  //      this.renderedAddedSkill.forEach((parentSkills,index) => {
  //       parentSkills.coreskills = this.tempCoreSkills[index] 
  //       this.spinnerFlag = false;
  //      })
  //    },
  //    error => this.errorMessage = <any>error);
 }
  

onDeleteSkillsRow(skills, coreSkills,id, index, parentIndex) {

  //console.log(coreSkills);

  let masterIndex = this.renderedAddedSkill.findIndex(skillFilter => {
    return skillFilter.skillId == skills.skillId;
  });
  let childIndex = this.renderedAddedSkill[masterIndex].coreskills.findIndex(coreskillFilter => {
    return coreskillFilter.core_skillid == id;
  });

  //console.log(masterIndex);
  //console.log(childIndex);

  this.renderedAddedSkill[masterIndex].coreskills.splice(childIndex,1);
  // if(this.renderedAddedSkill[masterIndex].coreskills.length <= 0){
  //   this.renderedAddedSkill.splice(masterIndex,1);
  // }

  /*coreSkills.splice(index,1);
  if(skills.coreskills.length == 0){
    this.addedSkill.splice(parentIndex, 1);
  }*/
for (var e in this.AllSkills.skillLists){
  for (var d in this.AllSkills.skillLists[e].coreSkills){
     console.log('allSkills',this.AllSkills);
    if (this.AllSkills.skillLists[e].coreSkills[d].core_skillid == id){
      this.AllSkills.skillLists[e].coreSkills[d].selected = false;
    }
}
}; 
  
}


openModal() {
  const dialogConfig = new MatDialogConfig();
 dialogConfig.disableClose = true;
  dialogConfig.autoFocus = true;
  dialogConfig.data = {
  id: 1
  };
  const dialogRef = this.dialog.open(DialogComponent, dialogConfig);
  dialogRef.afterClosed().subscribe(result => {
  console.log("Dialog was closed" );
  console.log(result)
  if(result){
    this.submitFlag = true;
    this.onSaveSkillslist();
  }
});
}


onSaveSkillslist() {
  
  this.spinnerFlag = true;
  this.renderedAddedSkill.forEach(parentSkills => {
    let coreSkillIds:any = [];
    let coreSkillRatings: any = [];
    let coreExpInMonths: any = [];
    let newSkillSetIds: any = [];
      parentSkills.coreskills.forEach(skills => {
        coreSkillIds.push(skills.core_skillid);
        coreSkillRatings.push(skills.core_Skill_rating);
        coreExpInMonths.push(Number(skills.core_Skill_Experience_in_Years)*12+(Number(skills.core_Skill_Experience_in_Months)));
        newSkillSetIds.push(skills.newSkillSetIds || 0);
      });
      parentSkills.coreSkillIds = coreSkillIds.join("~");
      parentSkills.coreSkillRatings = coreSkillRatings.join("~");
      parentSkills.coreExpInMonths = coreExpInMonths.join("~");
      parentSkills.newSkillSetIds = newSkillSetIds.join("~");
      parentSkills.isActiveFlag = "1";
      parentSkills.insightId = "ajay_pr";
      parentSkills.employeeId = "2744";
      parentSkills.skillId = parentSkills.skillId.toString();
  });
  
     this.tempCoreSkills = [{}] as any;
   this.renderedAddedSkill.forEach((parentSkills,index) => {
     this.tempCoreSkills[index] = parentSkills.coreskills
      delete parentSkills.coreskills;
   })
     console.log({skill: this.renderedAddedSkill});
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

//   console.log(this.addedSkill);
//   console.log(this.renderedAddedSkill);
//     this.tempPostSkills = {} as Allskils;
//     this.tempPostSkills.skillLists = [{}] as any;
//   for(let i=0;i<this.renderedAddedSkill.length; i++){
//     this.tempPostSkills.employeeId = this.renderedAddedSkill[i].employeeId;
//     this.tempPostSkills.insightId = this.renderedAddedSkill[i].insightId;
//     this.tempPostSkills.coreExpInMonths = this.renderedAddedSkill[i].coreExpInMonths;
//     this.tempPostSkills.coreExpInYears = (this.renderedAddedSkill[i].coreExpInMonths / 12);
//     this.tempPostSkills.coreSkillIds = this.renderedAddedSkill[i].coreSkillIds;
//     this.tempPostSkills.coreSkillRatings = this.renderedAddedSkill[i].coreSkillRatings;
//     this.tempPostSkills.employeeName ="Naga Gopi Raju Nallagonda";
//     this.tempPostSkills.skillVersions = null;
//     this.tempPostSkills.searchKey = null;
//     this.tempPostSkills.skillId = this.renderedAddedSkill[i].skillId;
//     this.tempPostSkills.skillName = this.renderedAddedSkill[i].skillName;
//     this.tempPostSkills.newSkillSetIds = this.renderedAddedSkill[i].newSkillSetIds;
//     this.tempPostSkills.isActiveFlag = this.renderedAddedSkill[i].isActiveFlag;
//     this.tempPostSkills.skillLists[i].coreSkills = [{}] as any;
//     for(let j=0;j<this.renderedAddedSkill[i].coreskills.length;j++){
//       this.tempPostSkills.skillLists[i].coreSkills[j] = this.renderedAddedSkill[i].coreskills[j];
//         // this.tempPostSkills.skillLists[i].coreSkills[j].newSkillSetIds = this.renderedAddedSkill[i].coreskills[j].newSkillSetIds;
//         // this.tempPostSkills.skillLists[i].coreSkills[j].core_Skill_Name = this.renderedAddedSkill[i].coreskills[j].core_Skill_Name;
//         // this.tempPostSkills.skillLists[i].coreSkills[j].core_Skill_rating = this.renderedAddedSkill[i].coreskills[j].core_Skill_rating;
//         // this.tempPostSkills.skillLists[i].coreSkills[j].core_Skill_Experience_in_Months = this.renderedAddedSkill[i].coreskills[j].core_Skill_Experience_in_Months;
//       }
// }
//     console.log('temppostskills',this.tempPostSkills);