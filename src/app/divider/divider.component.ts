import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';

export type Config = {
  excludeIndex: number;
  newLine: NewLineConfig;
}

export type NewLineConfig = {
  before: boolean;
  after: boolean;
}

@Component({
  selector: 'rm-divider',
  standalone: true,
  imports: [
    CommonModule,

    MatDividerModule
  ],
  templateUrl: './divider.component.html',
  styleUrl: './divider.component.css'
})
export class DividerComponent {
  @Input() currentIndex: number = 0

  @Input() config: Config = { excludeIndex: 0, newLine: { after: false, before: false } };

}
