import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './../recipe';
import { QuantityService } from '../services/quantity.service';

@Pipe({
  name: 'quantity',
  standalone: true
})
export class QuantityPipe implements PipeTransform {

  constructor(private quantityService: QuantityService) { }

  transform(product: Product, portions: number): number {
    return this.quantityService.transform(product, portions);
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
