import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './../recipe';

@Pipe({
  name: 'quantity',
  standalone: true
})
export class QuantityPipe implements PipeTransform {

  transform(product: Product, portions: number): number {
    return product.quantity * portions;
  }

}
