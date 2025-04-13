import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(products:any[],kelma:string): any {
    return products.filter((item)=>{
      return item.title.toLowerCase().includes(kelma.toLowerCase())
    })
  }

}
