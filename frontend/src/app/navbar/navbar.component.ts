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
  constructor(private router: Router, private authService: AuthService) {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();  // ✅ Vérifie la connexion via AuthService
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();  // ✅ Vérifie le rôle via AuthService
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
