import { Component } from '@angular/core';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { OnInit } from '@angular/core';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatCardModule,
            MatGridListModule,
            MatFormFieldModule,
            MatInputModule],
  templateUrl: `app.component.html`,
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {


  recipes = []

  title = 'homes';

  ngOnInit(): void {
    console.log('onInit')
  }

}
