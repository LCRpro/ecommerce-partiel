import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient, private router: Router) {}

  // ✅ Requête de connexion à l'API
  login(credentials: { username: string; password: string }) {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  // ✅ Stockage des informations de l'utilisateur dans le localStorage
  storeUser(user: any) {
    console.log('🔐 Connexion réussie :', user);
    localStorage.setItem('user', JSON.stringify(user));
  }
  getUserId(): number {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.id || 0;
  }
  // ✅ Vérifie si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }

  // ✅ Vérifie si l'utilisateur est admin
  isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.role === 'admin';
  }

  // ✅ Déconnexion de l'utilisateur
  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
