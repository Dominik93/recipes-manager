import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';

import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Product, Recipe } from '../../recipe';
import { MatListModule } from '@angular/material/list';
import { QuantityComponent } from '../quantity/quantity.component';
import { MatOptionModule } from '@angular/material/core';

@Component({
  selector: 'rm-recipe',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    MatFormFieldModule,
    MatListModule,
    MatOptionModule,
    MatSelectModule,
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

  readonly units = [
    'g',
    'sz'
  ];

  recipe: Recipe = {
    name: "",
    portions: 1,
    products: [],
    selected: false
  };

  constructor(public dialog: MatDialog) { }

  onAddProduct() {
    const product: Product = { name: "", quantity: { base: 1, portions: {} }, selected: false, unit: this.units[0] }
    this.recipe.products = this.recipe.products.concat(product);
  }

  onAddQuantityPerProduct(index: number) {
    const dialogRef = this.dialog.open(QuantityComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result.portion !== undefined && result.portion > 0) {
        this.recipe.products[index].quantity.portions[result.portion] = result.quantity;
      }
    });
  }

}
