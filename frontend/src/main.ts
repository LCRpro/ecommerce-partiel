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

const routes: Routes = [
  { path: '', component: IndexComponent },               // ✅ Page d'accueil par défaut
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'products', component: ProductComponent }
];

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(RouterModule.forRoot(routes))
  ]
}).catch(err => console.error(err));
