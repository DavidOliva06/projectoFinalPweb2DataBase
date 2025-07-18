import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonModule], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'torneo-app';
}