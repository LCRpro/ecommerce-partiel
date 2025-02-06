import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';  // ✅ Import du service d'authentification
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // ✅ Import du FormsModule
import { RouterModule } from '@angular/router';  // ✅ Import du RouterModule

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],  // ✅ Ajout des modules nécessaires
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';


  constructor(private http: HttpClient, private router: Router, private authService: AuthService) {}

  login(): void {
    this.http.post('http://localhost:3000/users/login', {
      username: this.username,
      password: this.password
    }).subscribe({
      next: (response: any) => {
        this.authService.login(response.user);  // ✅ Stocke l'utilisateur dans le localStorage
        this.router.navigate(['/products']);
      },
      error: () => {
        this.errorMessage = 'Nom d\'utilisateur ou mot de passe incorrect';
      }
    });
  }
}
