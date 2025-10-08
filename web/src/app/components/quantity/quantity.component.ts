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
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

export type QuantityPart = {

  portion: number;
  quantity: number;

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

  quantities: QuantityPart[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: QuantityPart[]) {
    this.quantities = data ?? [];
    this.sort();
  }

  onAdd() {
    this.quantities.push({ portion: this.getMaxPortion(), quantity: 0 });
    this.sort();
  }

  onDelete(quantity: QuantityPart) {
    this.quantities = this.quantities.filter(q => q.portion != quantity.portion);
    this.sort();
  }

  private sort() {
    this.quantities.sort((q1, q2) => q2.portion - q1.portion);
  }

  private getMaxPortion(): number {
    let portion = 0;
    for (let quantity of this.quantities) {
      if (quantity.portion > portion) {
        portion = quantity.portion
      }
    }
    return portion + 1;
  }

}