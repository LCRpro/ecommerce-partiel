import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username = '';
  password = '';
  role: 'admin' | 'client' = 'client';
  errorMessage = '';

  constructor(private http: HttpClient, private router: Router) {}

  register() {
    this.http.post('http://localhost:3000/users/register', {
      username: this.username,
      password: this.password,
      role: this.role
    }).subscribe({
      next: () => {
        this.router.navigate(['/']);  // ✅ Redirection vers la page de login après inscription
      },
      error: () => {
        this.errorMessage = 'Erreur lors de l\'inscription';
      }
    });
  }
}
