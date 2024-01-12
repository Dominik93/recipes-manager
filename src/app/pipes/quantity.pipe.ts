import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './../recipe';

@Pipe({
  name: 'quantity',
  standalone: true
})
export class QuantityPipe implements PipeTransform {

  transform(product: Product, portions: number): number {
    let value = this.calculate(product, portions);
    if (value % 1 > 0.7) {
      value = Math.round(value);
    }
    return this.convert(value);
  }

  private calculate(product: Product, portions: number) {
    if (!product.scalable) {
      return product.quantity.base;
    }
    if (product.quantity.portions === undefined || product.quantity.portions[portions] === undefined) {
      return product.quantity.base * portions;
    }
    return product.quantity.portions[portions];
  }

  private convert(value: number) {
    return Number(value.toFixed(2));
  }

}
