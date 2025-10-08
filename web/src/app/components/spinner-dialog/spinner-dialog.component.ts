import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'rm-spinner-dialog',
  standalone: true,
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './spinner-dialog.component.html',
  styleUrl: './spinner-dialog.component.css'
})
export class SpinnerDialogComponent {

}
