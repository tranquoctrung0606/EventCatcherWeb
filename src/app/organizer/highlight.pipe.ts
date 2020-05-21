import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'highlight',
    pure: false
  })
  export class HighlightPipe implements PipeTransform {
  
    transform(items: any, search: string, clip?: boolean): any {
      const regex = new RegExp(search, 'ig');
      if(Array.isArray(items) && search) {
        for(let item of items) {
            item.highlight = regex.test(item.name);
        }
      }
      return clip ? items.filter(item => item.highlight) : items;
    }
  
  }