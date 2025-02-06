import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:3000/orders';

  constructor(private http: HttpClient) {}

  getOrdersByUser(userId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/${userId}`);  // ✅ Appel de l'API avec l'ID utilisateur
  }
  getAllOrders(): Observable<any> {
    return this.http.get(`${this.apiUrl}/all`);  // ✅ Endpoint pour récupérer toutes les commandes
  }

  updateOrderStatus(orderId: number, status: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${orderId}/status`, { status });  // ✅ Mise à jour du statut
  }
}
