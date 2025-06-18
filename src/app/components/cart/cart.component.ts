import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { PizzaService } from '../../services/pizza.service';

declare const bootstrap: any;

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container mt-4">
      <h2 class="text-center mb-4">Il Tuo Carrello</h2>
      
      @if (pizzaService.getCart()().length === 0) {
        <div class="alert alert-info text-center">
          Il tuo carrello è vuoto
          <a routerLink="/menu" class="btn btn-primary ms-3">Vai al Menu</a>
        </div>
      } @else {
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>Pizza</th>
                <th>Prezzo</th>
                <th>Quantità</th>
                <th>Totale</th>
                <th>Azioni</th>
              </tr>
            </thead>
            <tbody>
              @for (pizza of pizzaService.getCart()(); track pizza.id) {
                <tr>
                  <td>{{ pizza.name }}</td>
                  <td>{{ pizza.price | currency:'EUR' }}</td>
                  <td>{{ pizza.quantity }}</td>
                  <td>{{ pizza.price * pizza.quantity | currency:'EUR' }}</td>
                  <td>
                    <button class="btn btn-danger btn-sm" (click)="pizzaService.removeFromCart(pizza.id)">
                      Rimuovi
                    </button>
                  </td>
                </tr>
              }
            </tbody>
            <tfoot>
              <tr>
                <td colspan="3" class="text-end"><strong>Totale:</strong></td>
                <td colspan="2"><strong>{{ pizzaService.getTotalPrice() | currency:'EUR' }}</strong></td>
              </tr>
            </tfoot>
          </table>
        </div>
        
        <div class="d-flex justify-content-between mt-4">
          <a routerLink="/menu" class="btn btn-secondary">Continua a Ordinare</a>
          <button class="btn btn-success" (click)="showConfirmationModal()">Procedi all'Ordine</button>
        </div>
      }
    </div>

    <!-- Modal di conferma -->
    <div class="modal fade" id="confirmationModal" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Ordine Confermato!</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body text-center">
            <i class="bi bi-check-circle-fill text-success" style="font-size: 4rem;"></i>
            <p class="mt-3">Grazie per il tuo ordine!</p>
            <p>Il tuo ordine è stato ricevuto e verrà preparato al più presto.</p>
          </div>
          <div class="modal-footer justify-content-center">
            <button type="button" class="btn btn-primary" (click)="completeOrder()">
              Torna al menù
            </button>
          </div>
        </div>
      </div>
    </div>
  `
})
export class CartComponent {
  constructor(
    public pizzaService: PizzaService,
    private router: Router
  ) {}

  showConfirmationModal() {
    const modal = new bootstrap.Modal(document.getElementById('confirmationModal')!);
    modal.show();
  }

  completeOrder() {
    this.pizzaService.getCart().set([]);
    const modal = bootstrap.Modal.getInstance(document.getElementById('confirmationModal')!);
    modal?.hide();
    this.router.navigate(['/menu']);
  }
} 