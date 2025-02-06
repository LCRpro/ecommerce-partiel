import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // ✅ Récupère l'ID de l'utilisateur connecté depuis le localStorage
  getUserId(): number {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.id || 1;  // ✅ Par défaut, l'ID est 1 si l'utilisateur n'est pas connecté
  }

  // ✅ Stocke les informations de l'utilisateur après connexion
  login(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // ✅ Déconnexion de l'utilisateur
  logout() {
    localStorage.removeItem('user');
  }

  // ✅ Vérifie si l'utilisateur est connecté
  isLoggedIn(): boolean {
    return !!localStorage.getItem('user');
  }
}
