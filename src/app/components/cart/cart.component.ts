import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SelectedPipe } from './../../pipes/selected.pipe';
import { QuantityPipe } from './../../pipes/quantity.pipe';
import { NEW_VERSION, Product, Recipe, RecipeProducts } from './../../recipe'
import { environment } from '../../../environments/environment';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Config, DividerComponent } from '../../divider/divider.component';
import { CartSummaryComponent, SummaryProduct } from '../cart-summary/cart-summary.component';
import { MatChipsModule } from '@angular/material/chips';
import { SortCartProductPipe } from '../../pipes/sort-cart-product.pipe';
import { LoggingService } from '../../services/logging/logging';
import { RecipesService } from '../../services/recipes/recipes.service';
import { Versionservice } from '../../services/version.service';
import { SpinnerService } from '../../services/spinner.service';
import { NotificationService } from '../../services/notification.service';
import { versionMismatch } from '../i18n/recipes-i18n';
import { ListUtil } from '../../utils/list-util';
import { RefreshService } from '../../services/refresh.service';
import { ProlongateTokenService } from '../../services/authorization/prolongate-token.service';

type RecipeItem = {
  id: string;
  name: string;
  selected: boolean;
  portions: number;
  version: number;
  products: Product[];
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
    MatChipsModule,

    CartSummaryComponent,

    DividerComponent,

    QuantityPipe,
    SortCartProductPipe,
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

  _active: boolean = false;

  @Input() set active(value: boolean) {
    this._active = value;
    this.loadRecipies();
  }

  recipes: RecipeItem[] = [];

  ownedProduct: boolean = false;

  constructor(
    @Inject('LoggingService') private log: LoggingService,
    @Inject('RecipesService') private recipesService: RecipesService,
    private prolongateTokenService: ProlongateTokenService,
    private refreshService: RefreshService,
    private versionService: Versionservice,
    private spinnerService: SpinnerService,
    private notificationService: NotificationService) {
    this.ownedProduct = environment.config.ownedProducts.enabled;
  }

  ngOnInit(): void {
    this.refreshService.getRefresh().subscribe(value => {
      this.prolongateTokenService.prolongateToken(() => this.loadRecipies())
    })
  }

  private loadRecipies(): void {
    if (!this._active) {
      return;
    }
    this.recipesService.getRecipesProducts()
      .subscribe(value => {
        this.recipes = []
        Object.keys(value.container).forEach(key => {
          this.recipes.push({
            id: key,
            name: value.container[key].name,
            selected: value.container[key].selected,
            portions: value.container[key].portions,
            products: value.container[key].products,
            version: value.versions[key],
          });
        })
        this.log.debug("CartComponent::loadRecipies loaded recipies", this.recipes);
      });
  }

  onChangePortions(id: string): void {
    this.spinnerService.openSpinner();
    const recipe: RecipeItem = ListUtil.find(this.recipes, (r) => r.id === id);
    this.recipesService.getRecipeVersion(id).subscribe(value => {
      if (this.versionService.mismatchVersion(recipe.version, value)) {
        this.handleVersionMismatch()
      } else {
        const version: number = NEW_VERSION();
        const recipeProducts: RecipeProducts = {
          name: recipe.name,
          portions: recipe.portions,
          products: recipe.products,
          selected: recipe.selected,
        }
        this.recipesService.saveRecipeProducts(version, id, recipeProducts).subscribe(() => {
          recipe.version = version;
          this.spinnerService.closeSpinner();
        })
      }
    })
  }

  onToggleOwned(event: any, id: string, product: Product): void {
    event?.stopPropagation();
    this.spinnerService.openSpinner();
    const recipe: RecipeItem = ListUtil.find(this.recipes, (r) => r.id === id);
    this.recipesService.getRecipeVersion(id).subscribe(value => {
      if (this.versionService.mismatchVersion(recipe.version, value)) {
        this.handleVersionMismatch()
      } else {
        product.owned.show = !product.owned.show;
        const version: number = NEW_VERSION();
        const recipeProducts: RecipeProducts = {
          name: recipe.name,
          portions: recipe.portions,
          products: recipe.products,
          selected: recipe.selected
        }
        this.recipesService.saveRecipeProducts(version, id, recipeProducts).subscribe(() => {
          recipe.version = version;
          this.spinnerService.closeSpinner();
        })
      }
    })
  }

  onItemClick(event: any, id: string, product: Product): void {
    event?.stopPropagation();
    const recipe: RecipeItem = ListUtil.find(this.recipes, (r) => r.id === id);
    this.recipesService.getRecipeVersion(id).subscribe(value => {
      if (this.versionService.mismatchVersion(recipe.version, value)) {
        this.handleVersionMismatch()
      } else {
        const version: number = NEW_VERSION();
        product.selected = !product.selected;
        const recipeProducts: RecipeProducts = {
          name: recipe.name,
          portions: recipe.portions,
          products: recipe.products,
          selected: recipe.selected,
        }
        this.recipesService.saveRecipeProducts(version, id, recipeProducts).subscribe(() => {
          recipe.version = version;
          this.spinnerService.closeSpinner();
        })
      }
    })
  }

  onChangeOnwed(id: string): void {
    this.spinnerService.openSpinner();
    const recipe: RecipeItem = ListUtil.find(this.recipes, (r) => r.id === id);
    this.recipesService.getRecipeVersion(id).subscribe(value => {
      if (this.versionService.mismatchVersion(recipe.version, value)) {
        this.handleVersionMismatch()
      } else {
        const version: number = NEW_VERSION();
        const recipeProducts: RecipeProducts = {
          name: recipe.name,
          portions: recipe.portions,
          products: recipe.products,
          selected: recipe.selected,
        }
        this.recipesService.saveRecipeProducts(version, id, recipeProducts).subscribe(() => {
          recipe.version = version;
          this.spinnerService.closeSpinner();
        })
      }
    })
  }

  onSummaryProductSelected(summaryProduct: SummaryProduct): void {
    //todo 
    this.recipes.forEach(recipe => {
      recipe.products
        .filter(product => product.name === summaryProduct.name && product.unit === summaryProduct.unit)
        .forEach(product => product.selected = true);
    })
  }

  private handleVersionMismatch(): void {
    this.log.info('CartComponent::handleVersionMismatch version mismatch');
    this.spinnerService.closeSpinner();
    this.notificationService.showNotification(versionMismatch);
    this.loadRecipies();
  }

  recipeTrackBy(index: number, recipe: Recipe): Recipe {
    return recipe;
  }

}
