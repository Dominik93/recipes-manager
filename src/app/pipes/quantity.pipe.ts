import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './../recipe';

@Pipe({
  name: 'quantity',
  standalone: true
})
export class QuantityPipe implements PipeTransform {

  transform(product: Product, portions: number): number {
    if(product.quantity.portions === undefined || product.quantity.portions[portions] === undefined) {
      return product.quantity.base * portions;
    } 
    return product.quantity.portions[portions];
  }

}
