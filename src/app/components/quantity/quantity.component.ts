import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

export type Quantity = {

  quantity: number;
  portion: number;

}

@Component({
  selector: 'rm-quantity',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,

    MatFormFieldModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent
  ],
  templateUrl: './quantity.component.html',
  styleUrl: './quantity.component.css'
})
export class QuantityComponent {

  quantity: Quantity = { portion: 0, quantity: 0 }

}
