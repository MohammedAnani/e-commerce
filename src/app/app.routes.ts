import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './core/gurds/auth.guard';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { logedGuard } from './core/gurds/loged.guard';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate:[logedGuard],
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent, title: 'Login' },
      { path: 'register', component: RegisterComponent, title: 'Register' },
      { path: 'forgetpassword', component: ForgetPasswordComponent, title: 'Forgot Password' },
    ]
  },
  {
    path: '',
    component: BlankLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent, title: 'Home' },

      {
        path: 'products',
        loadComponent: () => import('./components/products/products.component').then(c => c.ProductsComponent),
        title: 'Products'
      },
      {
        path: 'cart',
        loadComponent: () => import('./components/cart/cart.component').then(c => c.CartComponent),
        title: 'Cart'
      },
      {
        path: 'brands',
        loadComponent: () => import('./components/brands/brands.component').then(c => c.BrandsComponent),
        title: 'Brands'
      },
      {
        path: 'categories',
        loadComponent: () => import('./components/categories/categories.component').then(c => c.CategoriesComponent),
        title: 'Categories'
      },
      {
        path: 'details/:id',
        loadComponent: () => import('./components/details/details.component').then(c => c.DetailsComponent),
        title: 'Product Details'
      },
      {
        path: 'allorders',
        loadComponent: () => import('./components/allorders/allorders.component').then(c => c.AllordersComponent),
        title: 'All Orders'
      },
      {
        path: 'order/:id',
        loadComponent: () => import('./components/order/order.component').then(c => c.OrderComponent),
        title: 'Order Details'
      },
    ]
  },

  {
    path: '**',
    loadComponent: () => import('./components/not-found/not-found.component').then(c => c.NotFoundComponent),
    title: 'Page Not Found'
  }
];
