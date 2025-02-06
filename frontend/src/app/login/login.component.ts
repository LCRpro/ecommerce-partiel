import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  
  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.http.post<{ access_token: string }>('http://localhost:3000/auth/login', {
      username: this.username,
      password: this.password
    }).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.access_token);  // ✅ Stockage du token
        this.router.navigate(['/products']);                   // ✅ Redirection vers la page des produits
      },
      error: () => {
        this.errorMessage = 'Identifiants incorrects';
      }
    });
  }
}
