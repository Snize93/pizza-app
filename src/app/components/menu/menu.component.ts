import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PizzaService } from '../../services/pizza.service';

declare const bootstrap: any;

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container mt-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2>Il Nostro Menu</h2>
        <button class="btn btn-primary position-relative" (click)="showCartPreview()">
          <i class="bi bi-cart3"></i> Anteprima Carrello
          @if (getTotalItems() > 0) {
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {{ getTotalItems() }}
            </span>
          }
        </button>
      </div>

      <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        @for (pizza of pizzaService.getPizzas()(); track pizza.id) {
          <div class="col">
            <div class="card h-100">
              <a [routerLink]="['/pizze', pizza.id]">
                <img [src]="pizza.image" class="card-img-top" [alt]="pizza.name">
              </a>
              <div class="card-body">
                <h5 class="card-title">{{ pizza.name }}</h5>
                <p class="card-text">{{ pizza.price | currency:'EUR' }}</p>
                <div class="d-flex justify-content-between align-items-center mt-3">
                  <button class="btn btn-danger" (click)="decrementPizza(pizza)">
                    <i class="bi bi-dash"></i>
                  </button>
                  <span class="quantity-badge">
                    {{ getPizzaQuantity(pizza.id) }}
                  </span>
                  <button class="btn btn-success" (click)="pizzaService.addToCart(pizza)">
                    <i class="bi bi-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>

    <!-- Modal Anteprima Carrello -->
    <div class="modal fade" id="cartPreviewModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Anteprima Carrello</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            @if (pizzaService.getCart()().length === 0) {
              <p class="text-center">Il tuo carrello è vuoto</p>
            } @else {
              <div class="cart-preview-items">
                @for (pizza of pizzaService.getCart()(); track pizza.id) {
                  <div class="d-flex justify-content-between align-items-center mb-2">
                    <div>
                      <h6 class="mb-0">{{ pizza.name }}</h6>
                      <small class="text-muted">Quantità: {{ pizza.quantity }}</small>
                    </div>
                    <div class="text-end">
                      <div>{{ pizza.price * pizza.quantity | currency:'EUR' }}</div>
                      <small class="text-muted">{{ pizza.price | currency:'EUR' }} cad.</small>
                    </div>
                  </div>
                }
                <hr>
                <div class="d-flex justify-content-between">
                  <strong>Totale:</strong>
                  <strong>{{ pizzaService.getTotalPrice() | currency:'EUR' }}</strong>
                </div>
              </div>
            }
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Chiudi</button>
            @if (pizzaService.getCart()().length > 0) {
              <a routerLink="/cart" class="btn btn-primary" (click)="closeModal()">Vai al Carrello</a>
            }
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card {
      transition: transform 0.2s;
      &:hover {
        transform: translateY(-5px);
      }
    }
    .card-img-top {
      height: 200px;
      object-fit: cover;
      cursor: pointer;
    }
    .quantity-badge {
      background-color: #f8f9fa;
      border: 1px solid #dee2e6;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 1.1rem;
    }
    .cart-preview-items {
      max-height: 300px;
      overflow-y: auto;
    }
  `]
})
export class MenuComponent {
  constructor(public pizzaService: PizzaService) {}

  getPizzaQuantity(pizzaId: number): number {
    const cart = this.pizzaService.getCart()();
    const pizzaInCart = cart.find(p => p.id === pizzaId);
    return pizzaInCart ? pizzaInCart.quantity : 0;
  }

  getTotalItems(): number {
    return this.pizzaService.getCart()().reduce((total, pizza) => total + pizza.quantity, 0);
  }

  showCartPreview() {
    const modal = new bootstrap.Modal(document.getElementById('cartPreviewModal')!);
    modal.show();
  }

  closeModal() {
    const modal = bootstrap.Modal.getInstance(document.getElementById('cartPreviewModal')!);
    modal?.hide();
  }

  decrementPizza(pizza: any) {
    const cart = this.pizzaService.getCart()();
    const pizzaInCart = cart.find(p => p.id === pizza.id);
    
    if (pizzaInCart && pizzaInCart.quantity > 0) {
      pizzaInCart.quantity--;
      if (pizzaInCart.quantity === 0) {
        this.pizzaService.removeFromCart(pizza.id);
      } else {
        this.pizzaService.getCart().set([...cart]);
      }
    }
  }
}