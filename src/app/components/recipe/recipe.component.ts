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
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { Product, Recipe, Tag } from '../../recipe';
import { QuantityComponent, QuantityPart } from '../quantity/quantity.component';
import { LoggingService } from '../../services/logging/logging';
import { ObjectUtil } from '../../utils/object-util';
import { Config, DividerComponent } from '../../divider/divider.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'rm-recipe',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    MatFormFieldModule,
    MatIconModule,
    MatTooltipModule,
    MatMenuModule,
    MatIconModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatInputModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,

    DividerComponent
  ],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css'
})
export class RecipeComponent {

  unscalable = $localize`:unscalable@@unscalable:Unscalable`;

  readonly tags: Tag[] = ['VEGE', 'NONMOVABLE'];

  readonly dividerConfig: Config = {
    excludeIndex: 0,
    newLine: { after: true, before: false }
  }

  readonly units = [
    'g',
    'sz'
  ];

  recipe: Recipe = {
    name: "",
    portions: 1,
    notes: { enabled: false, value: '' },
    products: [],
    tags: { enabled: false, values: [] },
    selected: false
  };

  constructor(@Inject('LoggingService') private log: LoggingService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: Recipe) {
    this.recipe = data ?? this.recipe;
  }

  onAddProduct() {
    const product: Product = {
      name: "",
      tag: "",
      quantity: { base: 1, portions: {} },
      selected: false,
      unit: this.units[0],
      owned: { show: false, value: 0 },
      scalable: true
    }
    this.recipe.products = this.recipe.products.concat(product);
  }

  onToggleNotes() {
    this.recipe.notes.enabled = !this.recipe.notes.enabled;
  }

  onToggleTags() {
    this.recipe.tags.enabled = !this.recipe.tags.enabled;
    this.recipe.tags.values = [];
  }

  onProductScalable(product: Product) {
    product.scalable = true;
  }

  onProductUnscalable(product: Product) {
    product.scalable = false;
  }

  onCustomQuantityPerProduct(event: any, index: number) {
    event?.stopPropagation();
    const quantities = this.mapToQuantityParts(this.recipe.products[index].quantity.portions);
    this.log.debug('RecipeComponent::onCustomQuantityPerProduct Mapped quantities', quantities);
    const dialogRef = this.dialog.open(QuantityComponent,
      {
        data: quantities,
        ...this.dialogDimensions()
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      this.log.info('RecipeComponent::onCustomQuantityPerProduct Close dialog', result);
      if (!ObjectUtil.isEmpty(result)) {
        const portions = this.mapToPortions(result);
        this.log.debug('RecipeComponent::onCustomQuantityPerProduct Mapped quantity by portion', portions);
        this.recipe.products[index].quantity.portions = portions;
      }
    });
  }

  onDelete(event: any, index: number) {
    event?.stopPropagation();
    this.recipe.products.splice(index, 1);
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

  private dialogDimensions() {
    return {
      height: "calc(80% - 30px)",
      width: "100%",
      maxWidth: '360px'
    }
  }

}
