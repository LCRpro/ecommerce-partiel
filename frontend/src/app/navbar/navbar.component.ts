import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private router: Router) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');  // ✅ Vérifie si l'utilisateur est connecté
  }

  logout(): void {
    localStorage.removeItem('token');        // ✅ Déconnexion
    this.router.navigate(['/login']);        // ✅ Redirection vers la page de login
  }
}
