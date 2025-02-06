import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private router: Router,private authService: AuthService) {}
  isAdmin(): boolean {
    const role = localStorage.getItem('role');  // ✅ Vérifie le rôle stocké dans le localStorage
    return role === 'admin';
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');  // ✅ Vérifie si l'utilisateur est connecté
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
