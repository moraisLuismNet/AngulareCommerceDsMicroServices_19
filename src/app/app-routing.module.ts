import { inject } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard.service';
import { LoginComponent } from './shared/login/login.component';
import { RegisterComponent } from './shared/register/register.component';

// Ecommerce standalone components
import { ListgroupsComponent } from './ecommerce/listgroups/listgroups.component';
import { ListrecordsComponent } from './ecommerce/listrecords/listrecords.component';
import { CartDetailsComponent } from './ecommerce/cart-details/cart-details.component';
import { CartsComponent } from './ecommerce/carts/carts.component';
import { GenresComponent } from './ecommerce/genres/genres.component';
import { GroupsComponent } from './ecommerce/groups/groups.component';
import { RecordsComponent } from './ecommerce/records/records.component';
import { OrdersComponent } from './ecommerce/orders/orders.component';
import { UsersComponent } from './ecommerce/users/users.component';

export const canActivate = () => {
  const guard = inject(AuthGuard);
  if (!guard.isLoggedIn()) {
    const router = inject(Router);
    router.navigate(['/login']);
    return false;
  }
  return true;
};

export const routes: Routes = [
  // Public routes
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'listgroups', component: ListgroupsComponent },
  { path: 'listrecords/:idGroup', component: ListrecordsComponent },
  
  // Protected routes
  {
    path: '',
    canActivate: [canActivate],
    children: [
      // Ecommerce routes
      { path: 'cart-details', component: CartDetailsComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'carts', component: CartsComponent },
      { path: 'genres', component: GenresComponent },
      { path: 'groups', component: GroupsComponent },
      { path: 'records', component: RecordsComponent },
      { path: 'users', component: UsersComponent },
      
      // Lazy loaded standalone component
      { 
        path: 'admin-orders', 
        loadComponent: () => import('./ecommerce/admin-orders/admin-orders.component')
          .then(m => m.AdminOrdersComponent) 
      },
      
      // Default route
      { path: '', redirectTo: '/listgroups', pathMatch: 'full' },
      
      // Redirect any other route to home
      { path: '**', redirectTo: '' },
    ]
  },
  
  // Redirect any non-matching route to login
  { path: '**', redirectTo: 'login' },
];
