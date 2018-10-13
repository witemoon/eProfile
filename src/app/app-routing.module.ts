import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TechSkillListComponent } from './tech-skill-list/tech-skill-list.component';
import { ManagerSkillListComponent } from './manager-skill-list/manager-skill-list.component';


const routes: Routes = [
  { path: 'techskill', component: TechSkillListComponent },
  { path: 'managerskill', component: ManagerSkillListComponent },

  {path:'',redirectTo:'/',pathMatch:'full'}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
