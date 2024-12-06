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
import { ALL_TAGS, EMPTY_PRODUCT, Product, Recipe, RecipeDetails, RecipeProducts, Tag, UNITS } from '../../recipe';
import { QuantityComponent, QuantityPart } from '../quantity/quantity.component';
import { LoggingService } from '../../services/logging/logging';
import { ObjectUtil } from '../../utils/object-util';
import { Config, DividerComponent } from '../../divider/divider.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { TAG_LOCALIZE, UNSCALABLE } from '../i18n/recipes-i18n';
import { ListUtil } from '../../utils/list-util';

export type RecipeDialogData = {
  id: string
  recipe: Recipe;
  details: RecipeDetails;
  products: RecipeProducts;
}

export type RecipeDialogResult = {
  id: string
  recipe: Recipe;
  details: RecipeDetails;
  products: RecipeProducts;
}

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
    MatTabsModule,

    DividerComponent
  ],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.css'
})
export class RecipeComponent {

  unscalable = UNSCALABLE;

  tagsLocalize = TAG_LOCALIZE;

  id: string;

  recipe: Recipe;

  details: RecipeDetails;

  products: RecipeProducts;

  readonly tags: Tag[] = ALL_TAGS;

  readonly dividerConfig: Config = {
    excludeIndex: 0,
    newLine: { after: true, before: false }
  }

  readonly units = UNITS;

  constructor(@Inject('LoggingService') private log: LoggingService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: RecipeDialogData) {
    this.id = data.id;
    this.recipe = data.recipe;
    this.products = data.products;
    this.details = data.details;
  }

  onNameChange(name: any): void {
    this.products.name = name;
  }

  onAddProduct(): void {
    this.products.products = [EMPTY_PRODUCT()].concat(this.products.products);
  }

  onProductScalable(product: Product): void {
    product.scalable = true;
  }

  onProductUnscalable(product: Product): void {
    product.scalable = false;
  }

  onCustomQuantityPerProduct(event: any, id: string): void {
    event?.stopPropagation();
    const product = ListUtil.find(this.products.products, (p) => p.id === id);
    const quantities = this.mapToQuantityParts(product.quantity.portions);
    this.log.debug('RecipeComponent::onCustomQuantityPerProduct mapped quantities', quantities);
    const dialogRef = this.dialog.open(QuantityComponent,
      {
        data: quantities,
        ...this.dialogDimensions()
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      this.log.info('RecipeComponent::onCustomQuantityPerProduct close dialog', result);
      if (!ObjectUtil.isEmpty(result)) {
        const portions = this.mapToPortions(result);
        this.log.debug('RecipeComponent::onCustomQuantityPerProduct mapped quantity by portion', portions);
        product.quantity.portions = portions;
      }
    });
  }

  onDelete(event: any, id: string): void {
    event?.stopPropagation();
    this.products.products = ListUtil.deleteIf(this.products.products, (p) => p.id === id);
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

  private mapToPortions(quantities: QuantityPart[]): { [key: number]: number } {
    let portions: { [key: number]: number } = {}
    for (var quantity of quantities) {
      portions[quantity.portion] = quantity.quantity;
    }
    return portions;
  }

  private mapToQuantityParts(portions: { [key: number]: number }): QuantityPart[] {
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
