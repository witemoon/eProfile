import { Injectable, Pipe, PipeTransform } from '@angular/core';  
  
@Pipe({  
    name: 'techSearchfilter'  
})  
  
@Injectable()  
export class SearchFilterPipe implements PipeTransform {  
    transform(items: any[], value: string): any[] {  
        if (!items) return [];  
        if(value) {  
            return items.filter(item => item.skill_Name.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) > -1);  
        }  
        else  
        {  
            return items;  
        }  
    }  
} 