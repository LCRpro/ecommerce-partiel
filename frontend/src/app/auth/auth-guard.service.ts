import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isLoggedIn = this.authService.isLoggedIn();
    const user = JSON.parse(localStorage.getItem('user') || '{}');

  //  console.log('🔑 Utilisateur connecté :', user);
    
    if (!isLoggedIn) {
   //   console.log('⛔ Utilisateur non connecté');
      this.router.navigate(['/login']);
      return false;
    }

    if (state.url.includes('admin-dashboard') && user.role !== 'admin') {
  //    console.log('⛔ Accès refusé : rôle non autorisé');
      this.router.navigate(['/']);
      return false;
    }

 //   console.log('✅ Accès autorisé');
    return true;
  }
}
