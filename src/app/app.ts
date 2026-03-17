import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatToolbarModule],
  template: `
    <main id="content">
      <router-outlet />
    </main>
  `
})
export class App {}
