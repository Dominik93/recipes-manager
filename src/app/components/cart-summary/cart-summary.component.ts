import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Input } from '@angular/core';
import { Recipe, RecipeProducts } from '../../recipe'
import { QuantityService } from '../../services/quantity.service';
import { MatCheckboxModule } from '@angular/material/checkbox';

export type SummaryProduct = {
  name: string,
  value: number,
  unit: string,
  show: boolean,
}

export class CartSummary {
  _products: SummaryProduct[] = []

  constructor() {
    this._products = [];
  }

  get products(): SummaryProduct[] {
    return this._products.filter(value => value.show);
  }

  addProduct(product: SummaryProduct) {
    const existingProduct = this._products.find(p => p.name === product.name && p.unit === product.unit)
    if (existingProduct) {
      existingProduct.show = true;
      existingProduct.value = existingProduct.value + product.value;
    } else {
      this._products.push(product);
    }
  }

}

@Component({
  selector: 'rm-cart-summary',
  standalone: true,
  imports: [
    MatCheckboxModule,

    CommonModule,
    FormsModule,
  ],
  providers: [],
  templateUrl: `cart-summary.component.html`,
  styleUrls: ['./cart-summary.component.css'],
})
export class CartSummaryComponent {

  @Output() summaryProductSelected = new EventEmitter<SummaryProduct>();

  summary: CartSummary = new CartSummary();

  @Input()
  set recipes(recipes: RecipeProducts[]) {
    this.summary = new CartSummary();
    this.setSummary(recipes);
  }

  constructor(private quantityService: QuantityService) {
  }
  
  onItemClick(event: any, product: SummaryProduct) {
    event?.stopPropagation();
    this.summaryProductSelected.next(product);
  }


  private setSummary(recipes: RecipeProducts[]) {
    this.summary = new CartSummary();
    recipes
      .filter(recipe => recipe.selected)
      .forEach(recipe => {
        recipe.products
          .filter(product => !product.selected)
          .forEach(product => {
            const value = this.quantityService.transform(product, recipe.portions) - (product.owned.show ? product.owned.value : 0);
            const summaryProduct: SummaryProduct = {
              name: product.name,
              unit: product.unit,
              value: value,
              show: false,
            }
            this.summary.addProduct(summaryProduct);
          })
      });
  }
}
