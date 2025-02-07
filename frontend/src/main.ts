import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './app/login/login.component';
import { ProductComponent } from './app/product/product.component';
import { RegisterComponent } from './app/register/register.component';
import { IndexComponent } from './app/index/index.component';
import { AuthGuard } from './app/auth/auth-guard.service';
import { CartComponent } from './app/cart/cart.component';
import { ClientOrdersComponent } from './app/client-orders/client-orders.component';
import { FormsModule } from '@angular/forms';
import { AdminDashboardComponent } from './app/admin-dashboard/admin-dashboard.component';


const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'products', component: ProductComponent, canActivate: [AuthGuard] },  // ✅ Sécurisation des routes
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'client-orders', component: ClientOrdersComponent, canActivate: [AuthGuard] },
  { 
    path: 'admin-dashboard', 
    component: AdminDashboardComponent, 
    canActivate: [AuthGuard], 
    data: { requiresAdmin: true } 
  }
  
  
  ];

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(FormsModule),
    importProvidersFrom(RouterModule.forRoot(routes))
  ]
}).catch(err => console.error(err));
