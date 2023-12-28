import { Component, EventEmitter, Output } from '@angular/core';
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
  
  @Input() recipes: Recipe[] = [];

  @Output() productChanged = new EventEmitter<Recipe[]>();

  ownedProduct: boolean = false;

  constructor() {
    this.ownedProduct = environment.config.ownedProducts.enabled;
  }

  onChangePortions() {
    this.productChanged.next(this.recipes);
  }

  onToggleOwned(event: any, product: Product) {
    event?.stopPropagation();
    product.owned.show = !product.owned.show;
    this.productChanged.next(this.recipes);
  }

  onItemClick(event: any, product: Product) {
    event?.stopPropagation();
    product.selected = !product.selected;
    this.productChanged.next(this.recipes);
  }

  onChangeOnwed() {
    this.productChanged.next(this.recipes);
  }

  recipeTrackBy(index: number, recipe: Recipe) {
    return recipe;
  }
}
