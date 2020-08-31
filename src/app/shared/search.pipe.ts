import { Product } from './interfaces';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: Product[], productName = ''): any {
    if (!productName.trim()) {
      return products;
    }

    return products
      .filter(product => product.title.toLocaleLowerCase().includes(productName.toLocaleLowerCase()));
  }

}
