import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { SearchPipe } from './../../pipes/search.pipe';
import { Recipe } from './../../recipe'
import { RecipeComponent } from '../recipe/recipe.component';
import { MatButtonModule } from '@angular/material/button';
import { LoggingService } from '../../services/logging/logging';
import { SortSelectedPipe } from '../../pipes/sort-selected.pipe';

@Component({
  selector: 'rm-recipes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    MatCardModule,
    MatExpansionModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,

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

  constructor(@Inject('LoggingService') private log: LoggingService, public dialog: MatDialog) { }

  onAddRecipe(): void {
    const dialogRef = this.dialog.open(RecipeComponent, {
      height: "calc(80% - 30px)",
      width: "calc(100% - 30px)"
    });

    dialogRef.afterClosed().subscribe(result => {
      this.log.info('Close dialog', result);
      if (result !== '' && result.name !== '') {
        this.recipes.push(result);
        this.recipeAdded.emit(this.recipes);
      }
    });
  }

  onSelectionChange(event: any) {
    this.recipeSelected.emit(this.recipes);
  }

  onModify(event: any, index: number, recipe: Recipe): void {
    event.stopPropagation();
    const dialogRef = this.dialog.open(RecipeComponent, {
      data: recipe,
      height: "calc(80% - 30px)",
      width: "calc(100% - 30px)"
    });

    dialogRef.afterClosed().subscribe(result => {
      this.log.info('Close dialog', result);
      if (result !== '') {
        this.recipes[index] = result;
        this.recipeModified.emit(this.recipes);
      }
    });
  }

  onDelete(event: any, name: string) {
    event.stopPropagation();
    this.recipes = this.recipes.filter(recipe => recipe.name !== name)
    this.recipeDeleted.emit(this.recipes);
  }

} 
