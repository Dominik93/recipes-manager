import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SelectedPipe } from './../../pipes/selected.pipe';
import { QuantityPipe } from './../../pipes/quantity.pipe';
import { Product, Recipe } from './../../recipe'
import { SortSelectedPipe } from '../../pipes/sort-selected.pipe';
import { environment } from '../../../environments/environment';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Config, DividerComponent } from '../../divider/divider.component';
import { QuantityService } from '../../services/quantity.service';
import { LoggingService } from '../../services/logging/logging';

export type SummaryProduct = {
  name: string,
  value: number,
  unit: string,
}

export class CartSummary {
  products: SummaryProduct[]

  constructor() {
    this.products = [];
  }

  addProduct(product: SummaryProduct) {
    const existingProduct = this.products.find(p => p.name === product.name && p.unit === product.unit)
    if (existingProduct) {
      existingProduct.value = existingProduct.value + product.value;
    } else {
      this.products.push(product);
    }
  }

}

@Component({
  selector: 'rm-cart',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,

    DividerComponent,

    QuantityPipe,
    SortSelectedPipe,
    SelectedPipe],
  providers: [],
  templateUrl: `cart.component.html`,
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {

  readonly dividerConfig: Config = {
    excludeIndex: 0,
    newLine: { after: true, before: false }
  }

  _recipes: Recipe[] = [];

  @Output() productChanged = new EventEmitter<Recipe[]>();

  ownedProduct: boolean = false;

  summary: CartSummary = new CartSummary();

  @Input()
  set recipes(recipes: Recipe[]) {
    this.summary = new CartSummary();
    this._recipes = recipes;
    this.setSummary();
  }

  get recipes() {
    return this._recipes;
  }

  constructor(@Inject('LoggingService') private log: LoggingService,
    private quantityService: QuantityService) {
    this.ownedProduct = environment.config.ownedProducts.enabled;
  }

  onChangePortions() {
    this.setSummary();
    this.productChanged.next(this.recipes);
  }

  onToggleOwned(event: any, product: Product) {
    event?.stopPropagation();
    product.owned.show = !product.owned.show;
    this.setSummary();
    this.productChanged.next(this.recipes);
  }

  onItemClick(event: any, product: Product) {
    event?.stopPropagation();
    product.selected = !product.selected;
    this.setSummary();
    this.productChanged.next(this.recipes);
  }

  onChangeOnwed() {
    this.setSummary();
    this.productChanged.next(this.recipes);
  }

  recipeTrackBy(index: number, recipe: Recipe) {
    return recipe;
  }

  private setSummary() {
    this.summary = new CartSummary();
    this._recipes
      .filter(recipe => recipe.selected)
      .forEach(recipe => {
        recipe.products
          .filter(product => !product.selected)
          .forEach(product => {
            const value = this.quantityService.transform(product, recipe.portions) - (product.owned.show ? product.owned.value : 0);
            const summaryProduct: SummaryProduct = {
              name: product.name,
              unit: product.unit,
              value: value
            }
            this.summary.addProduct(summaryProduct);
          })
      });
  }
}
