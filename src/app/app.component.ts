import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
})
export class AppComponent {
  title = 'dog-ceo-viewer';
}
