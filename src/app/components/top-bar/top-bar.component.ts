import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
})
export class TopBarComponent {
  logo = 'assets/logo.webp';
}
