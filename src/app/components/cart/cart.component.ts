import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { SelectedPipe } from './../../pipes/selected.pipe';
import { QuantityPipe } from './../../pipes/quantity.pipe';
import { Product, Recipe } from './../../recipe'
import { SortSelectedPipe } from '../../pipes/sort-selected.pipe';
import { environment } from '../../../environments/environment';
import { MatMenuModule } from '@angular/material/menu';


@Component({
  selector: 'rm-cart',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,


    MatIconModule,
    MatCardModule,
    MatExpansionModule,
    MatDividerModule,
    MatButtonModule,
    MatListModule,
    MatIconModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,

    QuantityPipe,
    SortSelectedPipe,
    SelectedPipe],
  providers: [],
  templateUrl: `cart.component.html`,
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {

  @Input() recipes: Recipe[] = [];

  @Output() productChanged = new EventEmitter<Recipe[]>();

  ownedProduct: boolean = false;

  constructor() {
    this.ownedProduct = environment.features.ownedProduct;
  }

  onSelectionChange(event: any) {
    this.productChanged.next(this.recipes);
  }

  onChangePortions() {
    this.productChanged.next(this.recipes);
  }

  onToggleOwned(event: any, product: Product) {
    event?.stopPropagation();
    product.owned.show = !product.owned.show;
    this.productChanged.next(this.recipes);
  }

  recipeTrackBy(index: number, recipe: Recipe) {
    return recipe;
  }
}
