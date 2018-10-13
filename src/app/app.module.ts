import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule,} from '@angular/forms'  //forms
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { TechSkillListComponent } from './tech-skill-list/tech-skill-list.component';
import { SearchFilterPipe } from './tech-skill-list/tech-skill-list-pipe';
import { EProfileService } from './apiservice.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import {MatDialogModule} from "@angular/material";
import { MAT_DIALOG_DATA } from "@angular/material";
import {MatInputModule} from '@angular/material/input';
import { AppRoutingModule } from './/app-routing.module';
import { ManagerSkillListComponent } from './manager-skill-list/manager-skill-list.component';
//import { StorageServiceModule} from 'angular-webstorage-service';
import {LocalStorageModule } from 'angular-2-local-storage';
import { DialogComponent } from './dialog/dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    TechSkillListComponent,
    SearchFilterPipe,
    ManagerSkillListComponent,
    DialogComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    ModalModule,
    HttpClientModule,
    HttpModule,

    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatInputModule,
    AppRoutingModule,
    LocalStorageModule.withConfig({
      prefix: 'eprofile',
      storageType: 'localStorage'
    })
    //StorageServiceModule
      ],
  providers: [EProfileService],
  bootstrap: [AppComponent],
  entryComponents: [
   DialogComponent
  ]
})
export class AppModule { }
