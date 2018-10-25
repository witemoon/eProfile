import { Injectable, Pipe, PipeTransform } from '@angular/core';  
import { Allskils } from '../allskils';
  
@Pipe({  
    name: 'techSearchfilter'  
})  
  
@Injectable()  
export class SearchFilterPipe implements PipeTransform {  
    transform(items: any[], value: string): any[] {  
        if (!items) return [];  
        if(value) {  
            let filtered : any[] = [];
            
                items.forEach(parentSkills =>{
                console.log(value);
                if(parentSkills.skill_Name.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) > -1 ){
                    filtered.push(parentSkills);
                 }
                else{
                        parentSkills.coreSkills.forEach(coreskills =>{
                        let temp = coreskills.core_Skill_Name || " ";
                        if(temp.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) > -1 ){
                            filtered.push(parentSkills);
                            return;
                         }
                    })
                }
            }
            )
            console.log(filtered);
            return filtered;

            //items.filter(item => item.skill_Name.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) > -1);  
        }  
        else  
        {  
            return items;  
        }  
    }  
} 