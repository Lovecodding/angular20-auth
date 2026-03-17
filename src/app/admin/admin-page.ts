import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UsersList } from './users-list';
import { Auth } from '../core/auth/auth';

@Component({
  selector: 'app-admin-page',
  imports: [UsersList],
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPage {
  #auth = inject(Auth);
  #router = inject(Router);

  onLogout() {
    this.#auth.logout();
    this.#router.navigate(['/login']);
  }
}
