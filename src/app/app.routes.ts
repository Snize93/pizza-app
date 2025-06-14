import { Routes } from '@angular/router';
import { MenuComponent } from './components/menu/menu.component';
import { PizzaDetailComponent } from './components/pizza-detail/pizza-detail.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'pizze/:id', component: PizzaDetailComponent },
  { path: 'cart', loadComponent: () => import('./components/cart/cart.component').then(m => m.CartComponent) },
  { path: '**', redirectTo: '/menu' }
];
