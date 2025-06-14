import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PizzaService, Pizza } from '../../services/pizza.service';

@Component({
  selector: 'app-pizza-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="container mt-4">
      @if (pizza) {
        <div class="row">
          <div class="col-md-6">
            <img [src]="pizza.image" [alt]="pizza.name" class="img-fluid rounded">
          </div>
          <div class="col-md-6">
            <h2>{{ pizza.name }}</h2>
            <p class="lead">{{ pizza.price | currency:'EUR' }}</p>
            <p>{{ pizza.description }}</p>
            <div class="d-flex gap-2">
             
              <a routerLink="/menu" class="btn btn-secondary">Torna al Menu</a>
            </div>
          </div>
        </div>
      } @else {
        <div class="alert alert-warning">
          Pizza non trovata
          <a routerLink="/menu" class="btn btn-primary ms-3">Torna al Menu</a>
        </div>
      }
    </div>
  `,
  styles: [`
    img {
      max-height: 400px;
      object-fit: cover;
    }
  `]
})
export class PizzaDetailComponent implements OnInit {
  pizza: Pizza | undefined;

  constructor(
    private route: ActivatedRoute,
    public pizzaService: PizzaService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pizza = this.pizzaService.getPizzaById(id);
  }
}