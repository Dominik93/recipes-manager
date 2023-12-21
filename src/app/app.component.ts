import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { SelectedPipe } from './selected.pipe';
import { SearchPipe } from './search.pipe';
import { QuantityPipe } from './quantity.pipe';
import { RecipesService } from './recipes.service'
import { Recipe } from './recipe'


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
            CommonModule,
            FormsModule,


            MatIconModule,
            MatCardModule,
            MatExpansionModule,
            MatDividerModule,
            MatButtonModule,
            MatListModule,
            MatGridListModule,
            MatFormFieldModule,
            MatInputModule,

            QuantityPipe,
            SearchPipe,
            SelectedPipe],
  providers: [],
  templateUrl: `app.component.html`,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  searchValue: string = 'Ryż';
  authorized: boolean = false;
  recipes: Recipe[] = [];

  constructor(private recipesService: RecipesService) {}

  onLogin(): void {
    this.authorized = true;
    this.recipesService.getRecipes().subscribe((result:Recipe[]) => this.recipes = result);
  }

  onSave(): void {
  }

  onRefresh(): void {
  }

}
