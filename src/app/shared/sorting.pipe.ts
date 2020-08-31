import { Product } from './interfaces';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sorting'
})
export class SortingPipe implements PipeTransform {

  transform(products: Product[], type = ''): any {
    return products
      .filter(product => product.type === type);
  }

}
