import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'  // ✅ Fournit le service à l'ensemble de l'application
})
export class AdminService {
  private apiUrl = 'http://localhost:3000/admin';  // ✅ URL de l'API Backend

  constructor(private http: HttpClient) {}

  // ✅ Gestion des Produits
  getProducts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/products`);
  }

  addProduct(product: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/products`, product);
  }

  updateProduct(id: number, product: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/products/${id}`, product);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/products/${id}`);
  }

  getOrders(): Observable<any> {
    return this.http.get(`${this.apiUrl}/all`);  // ✅ Correspond à /orders/all
  }

  getDashboardData(): Observable<any> {
    return this.http.get(`${this.apiUrl}/all`);
  }

  updateOrderStatus(orderId: number, status: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/orders/${orderId}/status`, { status });
  }

  }
  
