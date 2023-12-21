import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { SearchPipe } from './../../pipes/search.pipe';
import { Recipe } from './../../recipe'


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

    SearchPipe],
  providers: [],
  templateUrl: `recipes.component.html`,
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent {

  @Input() recipes: Recipe[] = [];

  @Output() recipeSelected = new EventEmitter<Recipe[]>();

  searchValue: string = '';

  constructor() { }

  onRefresh(): void {
  }

  onSelectionChange(event: any) {
    this.recipeSelected.emit(this.recipes);
  }

} 
