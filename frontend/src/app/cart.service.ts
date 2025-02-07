import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:3000/cart';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getCart(): Observable<any> {
    const userId = this.authService.getUserId();
    // console.log('🔍 Récupération du panier pour l\'utilisateur ID:', userId);  
    return this.http.get(`${this.apiUrl}/${userId}`);
  }




  addToCart(item: { productId: number; quantity: number }): Observable<any> {
    const userId = this.authService.getUserId();
    return this.http.post(`${this.apiUrl}/add`, { ...item, userId });
  }



  removeFromCart(productId: number): Observable<any> {
    const userId = this.authService.getUserId();
    return this.http.delete(`${this.apiUrl}/${userId}/${productId}`);
  }

  validateOrder(): Observable<any> {
    const userId = this.authService.getUserId();
    return this.http.post(`http://localhost:3000/orders/validate/${userId}`, {});
  }
}
