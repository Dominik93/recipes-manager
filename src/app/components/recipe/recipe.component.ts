import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Product, Recipe } from '../../recipe';
import { MatList, MatListModule } from '@angular/material/list';

@Component({
  selector: 'rm-recipe',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    MatFormFieldModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent
  ],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css'
})
export class RecipeComponent {

  recipe: Recipe = {
    name: "",
    portions: 1,
    products: [],
    selected: false
  };

  units = [
    'g',
    'sz'
  ]

  onAddProduct() {
    const product: Product = { name: "", quantity: 1, quantityPerPortion: {}, selected: false, unit: "" }
    this.recipe.products = this.recipe.products.concat(product);
  }

}
