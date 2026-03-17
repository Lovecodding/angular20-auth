import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from './auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export default class Login {
  #auth = inject(Auth);
  #router = inject(Router);
  #fb = inject(FormBuilder);

  isLoading = this.#auth.isLoading;
  errorMessage = this.#auth.errorMessage;

  loginForm = this.#fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.#auth.login(username!, password!).subscribe({
        next: () => {
          this.#router.navigate(['/']);
        }
      });
    }
  }
}
