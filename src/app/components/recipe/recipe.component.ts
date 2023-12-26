import { Component, Inject } from '@angular/core';
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
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Product, Recipe } from '../../recipe';
import { MatListModule } from '@angular/material/list';
import { QuantityComponent, QuantityPart } from '../quantity/quantity.component';
import { MatOptionModule } from '@angular/material/core';
import { LoggingService } from '../../services/logging/logging';
import { ObjectUtil } from '../../utils/object-util';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'rm-recipe',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    MatFormFieldModule,
    MatIconModule,
    MatTooltipModule,
    MatListModule,
    MatOptionModule,
    
    MatMenuModule,
    MatDividerModule,
    MatIconModule,
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

  constructor(@Inject('LoggingService') private log: LoggingService, public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: Recipe) {
    this.recipe = data ?? this.recipe;
  }

  onAddProduct() {
    const product: Product = { name: "", quantity: { base: 1, portions: {} }, selected: false, unit: this.units[0], owned: {show:false, value: 0} }
    this.recipe.products = this.recipe.products.concat(product);
  }

  onChangeQuantityPerProduct(index: number) {
    const quantities = this.mapToQuantityParts(this.recipe.products[index].quantity.portions);
    this.log.debug('Mapped quantities', quantities);
    const dialogRef = this.dialog.open(QuantityComponent,
      {
        data: quantities,
        height: "calc(80% - 30px)",
        width: "calc(70% - 30px)"
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      this.log.info('Close dialog', result);
      if (!ObjectUtil.isEmpty(result)) {
        const portions = this.mapToPortions(result);
        this.log.debug('Mapped quantity by portion', portions);
        this.recipe.products[index].quantity.portions = portions;
      }
    });
  }

  displayAdditionalInfo(product: Product): boolean {
    return Object.keys(product.quantity.portions).length > 0;
  }

  convertToTooltip(product: Product): string {
    let result = '';
    for (let key in product.quantity.portions) {
      result += "{ " + key + ": " + product.quantity.portions[key] + product.unit + " } ";
    }
    return result;
  }

  private mapToPortions(quantities: QuantityPart[]) {
    let portions: { [key: number]: number } = {}
    for (var quantity of quantities) {
      portions[quantity.portion] = quantity.quantity;
    }
    return portions;
  }

  private mapToQuantityParts(portions: { [key: number]: number }) {
    const quantities: QuantityPart[] = []
    for (let key in portions) {
      quantities.push({ portion: Number(key), quantity: portions[key] });
    }
    return quantities;
  }

}
