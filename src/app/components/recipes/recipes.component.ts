import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { SearchPipe } from './../../pipes/search.pipe';
import { Recipe } from './../../recipe'
import { RecipeComponent } from '../recipe/recipe.component';
import { MatButtonModule } from '@angular/material/button';
import { LoggingService } from '../../services/logging/logging';
import { SortSelectedPipe } from '../../pipes/sort-selected.pipe';
import { CloneUtil } from '../../utils/clone-util';
import { ObjectUtil } from '../../utils/object-util';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationComponent } from '../../notification/notification.component';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatCheckboxModule } from '@angular/material/checkbox';

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
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatButtonModule,
    MatCheckboxModule,

    NotificationComponent,

    SearchPipe,
    SortSelectedPipe],
  providers: [],
  templateUrl: `recipes.component.html`,
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent {

  @Input() recipes: Recipe[] = [];

  @Output() recipeSelected = new EventEmitter<Recipe[]>();

  @Output() recipeAdded = new EventEmitter<Recipe[]>();

  @Output() recipeDeleted = new EventEmitter<Recipe[]>();

  @Output() recipeModified = new EventEmitter<Recipe[]>();

  searchValue: string = '';

  constructor(
    @Inject('LoggingService') private log: LoggingService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog) { }

  onAddRecipe(): void {
    const dialogRef = this.dialog.open(RecipeComponent, {
      ...this.dialogDimensions()
    });

    dialogRef.afterClosed().subscribe(result => {
      this.log.info('RecipesComponent::onAddRecipe Close dialog', result);
      this.addRecipe(result);
    });
  }

  onModify(event: any, name: string): void {
    event?.stopPropagation();
    this.log.debug("RecipesComponent::onModify", name);
    const recipe = this.recipes.find(recipe => recipe.name === name)
    const index = this.recipes.findIndex(recipe => recipe.name === name)
    this.log.debug("RecipesComponent::onModify", recipe, index);
    const dialogRef = this.dialog.open(RecipeComponent, {
      data: CloneUtil.clone(recipe),
      ...this.dialogDimensions()
    });

    dialogRef.afterClosed().subscribe(result => {
      this.log.info('RecipesComponent::onModify Close dialog', result);
      this.modifyRecipe(index, result);
    });
  }

  onDelete(event: any, name: string) {
    event?.stopPropagation();
    this.recipes = this.recipes.filter(recipe => recipe.name !== name)
    this.recipeDeleted.emit(this.recipes);
  }

  onItemClick(event: any, recipe: Recipe) {
    event?.stopPropagation();
    recipe.selected = !recipe.selected;
    this.recipeModified.emit(this.recipes);
  }

  private addRecipe(result: Recipe) {
    const name = result?.name;
    if (!ObjectUtil.isAnyEmpty([result, name])) {
      this.recipes.push(result);
      this.recipeAdded.emit(this.recipes);
      const recipeAddedMessage = $localize`:recipe-added@@recipe-added:Recipe '${name}' added.`;
      this.showNotification(recipeAddedMessage);
    } else {
      const recipeNotAddedMessage = $localize`:recipe-not-added@@recipe-not-added:Recipe not added.`;
      this.showNotification(recipeNotAddedMessage);
    }
  }

  private modifyRecipe(index: number, result: Recipe) {
    const name = this.recipes[index].name;
    if (!ObjectUtil.isAnyEmpty([result])) {
      this.recipes[index] = result;
      this.recipeModified.emit(this.recipes);
      const recipeModifiedMessage = $localize`:recipe-modified@@recipe-modified:Recipe '${name}' modified.`;
      this.showNotification(recipeModifiedMessage);
    } else {
      const recipeNotModifiedMessage = $localize`:recipe-not-modified@@recipe-not-modified:Recipe '${name}' not modified.`;
      this.showNotification(recipeNotModifiedMessage);
    }
  }

  private showNotification(message: string): void {
    this.snackBar.openFromComponent(NotificationComponent, {
      duration: 5000,
      data: message
    });
  }

  private dialogDimensions() {
    return {
      height: "calc(80% - 30px)",
      width: "100%",
      maxWidth: '830px'
    }
  }

  recipeTrackBy(index: number, recipe: Recipe) {
    return recipe;
  }
} 
