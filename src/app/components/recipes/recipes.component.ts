import { Component, Inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { SearchPipe } from './../../pipes/search.pipe';
import { ALL_TAGS, EMPTY_DETAILS, EMPTY_PRODUCTS, EMPTY_RECIPE, ID, NEW_VERSION, Notes, Recipe, RecipeProducts, Tag, Tags } from './../../recipe'
import { RecipeComponent, RecipeDialogData, RecipeDialogResult } from '../recipe/recipe.component';
import { MatButtonModule } from '@angular/material/button';
import { LoggingService } from '../../services/logging/logging';
import { SortSelectedPipe } from '../../pipes/sort-selected.pipe';
import { CloneUtil } from '../../utils/clone-util';
import { ObjectUtil } from '../../utils/object-util';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { TagFilterPipe } from '../../pipes/tag-filter.pipe';
import { DetailsDialogData, RecipeDetailsComponent } from '../recipe-details/recipe-details.component';
import { confirmDelete, recipeAddedMessage, recipeModifiedMessage, recipeNotAddedMessage, recipeNotModifiedMessage, TAG_LOCALIZE, versionMismatch } from '../i18n/recipes-i18n';
import { RecipesService } from '../../services/recipes/recipes.service';
import { NotificationService } from '../../services/notification.service';
import { ListUtil } from '../../utils/list-util';
import { Versionservice } from '../../services/version.service';
import { map } from 'rxjs';
import { SpinnerService } from '../../services/spinner.service';
import { RefreshService } from '../../services/refresh.service';
import { ProlongateTokenService } from '../../services/authorization/prolongate-token.service';

type RecipeItem = {
  id: string;
  name: string;
  selected: boolean;
  notes: Notes;
  tags: Tags;
  version: number;
}

@Component({
  selector: 'rm-recipes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    MatCardModule,
    MatExpansionModule,
    MatTooltipModule,
    MatListModule,
    MatSelectModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatButtonModule,
    MatCheckboxModule,

    SearchPipe,
    TagFilterPipe,
    SortSelectedPipe],
  providers: [],
  templateUrl: `recipes.component.html`,
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {

  tags: Tag[] = ALL_TAGS;

  tagsLocalize = TAG_LOCALIZE;

  selectedTag: Tag | undefined;

  recipes: RecipeItem[] = [];

  searchValue: string = '';

  private _active: boolean = false;

  @Input() set active(value: boolean) {
    this._active = value;
    this.loadRecipies();
  }

  constructor(
    @Inject('LoggingService') private log: LoggingService,
    @Inject('RecipesService') private recipesService: RecipesService,
    private prolongateTokenService: ProlongateTokenService,
    private refreshService: RefreshService,
    private versionService: Versionservice,
    private spinnerService: SpinnerService,
    private notificationService: NotificationService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.refreshService.getRefresh().subscribe(value => {
      this.prolongateTokenService.prolongateToken(() => this.loadRecipies())
    })
  }

  private loadRecipies(): void {
    if (!this._active) {
      return;
    }
    this.recipesService.getRecipes()
      .subscribe(value => {
        this.recipes = []
        Object.keys(value.container).forEach(key => {
          this.recipes.push({
            id: key,
            name: value.container[key].name,
            selected: value.container[key].selected,
            notes: value.container[key].notes,
            tags: value.container[key].tags,
            version: value.versions[key]
          })
        })
        this.log.debug("RecipesComponent::loadRecipies loaded recipies", this.recipes);
      });
  }

  onDetails(event: any, id: string): void {
    event?.stopPropagation();
    this.log.debug("RecipesComponent::onDetails", id);
    this.recipesService.getRecipeInfo(id).subscribe(info => {
      const dialogData: DetailsDialogData = { details: info.result.recipeDetails, products: info.result.recipeProdcuts };
      this.log.debug("RecipesComponent::onDetails open dialog", dialogData);
      const dialogRef = this.dialog.open(RecipeDetailsComponent, {
        data: dialogData,
        ...this.fullScreenDialogDimensions()
      });

      dialogRef.afterClosed().subscribe(result => {
        this.log.info('RecipesComponent::onDetails close dialog', result);
      });
    })
  }

  onAddRecipe(): void {
    const dialogData: RecipeDialogData = {
      id: ID(),
      recipe: EMPTY_RECIPE(),
      products: EMPTY_PRODUCTS(),
      details: EMPTY_DETAILS(),
    }
    this.log.debug("RecipesComponent::onAddRecipe open dialog", dialogData);
    const dialogRef = this.dialog.open(RecipeComponent, {
      data: dialogData,
      ...this.dialogDimensions()
    });

    dialogRef.afterClosed().subscribe(result => {
      this.log.info('RecipesComponent::onAddRecipe close dialog', result);
      this.addRecipe(result);
    });
  }

  onModify(event: any, id: string): void {
    event?.stopPropagation();
    this.log.debug("RecipesComponent::onModify", id);
    const recipe = ListUtil.find(this.recipes, (p) => p.id === id)

    this.recipesService.getRecipeDetails(id).subscribe(details => {
      this.recipesService.getRecipeProducts(id).subscribe(products => {
        const dialogData: RecipeDialogData = {
          id: id,
          recipe: recipe,
          details: details.result,
          products: products.result,
        }

        this.log.debug("RecipesComponent::onModify open dialog", dialogData);
        const dialogRef = this.dialog.open(RecipeComponent, {
          data: CloneUtil.clone(dialogData),
          ...this.dialogDimensions()
        });
        dialogRef.afterClosed().subscribe(result => {
          this.log.info('RecipesComponent::onModify close dialog', result);
          this.modifyRecipe(id, result);
        });
      })
    })
  }

  onDelete(event: any, id: string): void {
    event?.stopPropagation();
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { question: confirmDelete }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.log.info('RecipesComponent::onDelete close dialog', result);
      if (result) {
        this.spinnerService.openSpinner();
        this.recipesService.deleteRecipe(id).subscribe(value => {
          this.spinnerService.closeSpinner();
          this.recipes = this.recipes.filter(recipe => recipe.id !== id);
        })
      }
    });
  }

  onItemClick(event: any, recipe: RecipeItem): void {
    event?.stopPropagation();
    this.spinnerService.openSpinner();
    this.recipesService.getRecipeProducts(recipe.id)
      .pipe(map(value => value.result as RecipeProducts))
      .subscribe(recipeProducts => {
        this.recipesService.getRecipeVersion(recipe.id).subscribe(value => {
          if (this.versionService.mismatchVersion(recipe.version, value)) {
            this.handleVersionMismatch(recipe.version, value);
          } else {
            const newValue = !recipe.selected;
            const version = NEW_VERSION();
            recipeProducts.products.forEach(product => product.selected = false);
            recipeProducts.products.forEach(product => product.owned.show = false);
            recipeProducts.products.forEach(product => product.owned.value = 0);
            recipeProducts.selected = newValue;
            this.recipesService.setSelectionRecipe(version, recipe.id, newValue, recipeProducts)
              .subscribe(() => {
                recipe.selected = newValue;
                recipe.version = version;
                this.spinnerService.closeSpinner();
              });
          }
        })

      })
  }

  private addRecipe(result: RecipeDialogResult): void {
    if (ObjectUtil.isAnyEmpty([result])) {
      this.notificationService.showNotification(recipeNotAddedMessage);
    } else {
      const version: number = NEW_VERSION();
      this.spinnerService.openSpinner();
      this.recipesService.save(version, result.id, result.recipe, result.details, result.products)
        .subscribe(() => {
          this.recipes.push(this.toRecipeItem(result, version));
          this.spinnerService.closeSpinner();
          this.notificationService.showNotification(recipeAddedMessage(result.recipe.name));
        });
    }
  }

  private modifyRecipe(id: string, result: RecipeDialogResult): void {
    const recipe = ListUtil.find(this.recipes, (r) => r.id === id);
    if (ObjectUtil.isAnyEmpty([result])) {
      this.notificationService.showNotification(recipeNotModifiedMessage(recipe.name));
    } else {
      this.spinnerService.openSpinner();
      this.recipesService.getRecipeVersion(id).subscribe(value => {
        if (this.versionService.mismatchVersion(recipe.version, value)) {
          this.handleVersionMismatch(recipe.version, value);
        } else {
          const version = NEW_VERSION();
          this.recipesService.save(version, result.id, result.recipe, result.details, result.products)
            .subscribe(() => {
              ListUtil.replace(this.recipes, (r) => r.id == id, this.toRecipeItem(result, version));
              this.spinnerService.closeSpinner();
              this.notificationService.showNotification(recipeModifiedMessage(recipe.name));
            }
            );
        }
      });
    }
  }

  private toRecipeItem(result: RecipeDialogResult, version: number): RecipeItem {
    return {
      id: result.id,
      name: result.recipe.name,
      notes: result.recipe.notes,
      selected: result.recipe.selected,
      tags: result.recipe.tags,
      version: version,
    };
  }

  private handleVersionMismatch(storedVersion: number, version: number): void {
    this.log.info('RecipesComponent::handleVersionMismatch version mismatch', storedVersion, version);
    this.spinnerService.closeSpinner();
    this.notificationService.showNotification(versionMismatch);
    this.loadRecipies();
  }

  private dialogDimensions() {
    return {
      height: "calc(80% - 30px)",
      width: "100%",
      maxWidth: '950px'
    };
  }

  private fullScreenDialogDimensions() {
    return {
      maxWidth: '100vw',
      width: '100%'
    };
  }

  recipeTrackBy(index: number, recipe: Recipe) {
    return recipe;
  }

} 