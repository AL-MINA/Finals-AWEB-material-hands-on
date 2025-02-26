import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MaterialFormComponent } from './material-form/material-form.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MaterialFormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'material-hands-on';
}
