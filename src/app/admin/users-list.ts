import { HttpClient, httpResource } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';

interface User {
  id: number;
  firstName: string;
  lastName: string;
}

@Component({
  selector: 'app-users-list',
  imports: [MatButton],
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersList {

  #http = inject(HttpClient);

  protected updateError = signal(false);

  protected readonly data = httpResource<{ users: User[] }>(() => ({
    url: `https://dummyjson.com/auth/users?limit=7`
  }));

  unenrollUser(userId: number) {
    this.#http.patch<User>(
        `https://dummyjson.com/auth/users/${userId}`,
        { enrolled: false }
      )
      .subscribe({
        next: () => this.updatedSuccessfully(userId),
        error: () => this.updateError.set(true)
      });
  }
  
  private updatedSuccessfully(userId: number) {
    this.updateError.set(false);
    this.data.update((data) => ({
      users: data!.users.filter((user) => user.id !== userId),
    }));
  }
}
