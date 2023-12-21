import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Input } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { SelectedPipe } from './../../pipes/selected.pipe';
import { QuantityPipe } from './../../pipes/quantity.pipe';
import { RecipesService } from './../../services/recipes.service'
import { Recipe } from './../../recipe'


@Component({
  selector: 'rm-cart',
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
    SelectedPipe],
  providers: [],
  templateUrl: `cart.component.html`,
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {

  @Input() recipes: Recipe[] = [];

  constructor(private recipesService: RecipesService) { }

  onSelectionChange(event: any) {
    console.log('onSelectionChange', event);
    this.save()
  }

  save(): void {
  }

  onRefresh(): void {
  }

  trackBy(index: any, recipe: Recipe) {
    return recipe;
  }

}
