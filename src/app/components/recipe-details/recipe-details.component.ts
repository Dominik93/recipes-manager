import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MatDialog,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { EMPTY_RECIPE, Recipe } from '../../recipe';
import { LoggingService } from '../../services/logging/logging';
import { ManagerComponent } from "../../manager/manager.component";
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'rm-recipe-details', 
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
    MatListModule
],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.css'
})
export class RecipeDetailsComponent {

  recipe: Recipe = EMPTY_RECIPE();
  
  constructor(@Inject('LoggingService') private log: LoggingService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: Recipe) {
    this.recipe = data ?? this.recipe;
  }

}
