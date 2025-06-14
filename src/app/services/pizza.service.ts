import { Injectable, signal } from '@angular/core';

export interface Pizza {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class PizzaService {
  private pizzas = signal<Pizza[]>([
    {
      id: 1,
      name: "Margherita",
      price: 8.99,
      image: "https://raw.githubusercontent.com/zoelounge/menupizza/main/images/margherita.png",
      quantity: 0,
      description: "Tra le pizze, la pizza margherita è quella più semplice e più amata; una fragrante pizza fatta in casa con pomodoro, mozzarella, olio e basilico."
    },
    {
      id: 2,
      name: "Diavola",
      price: 9.99,
      image: "https://raw.githubusercontent.com/zoelounge/menupizza/main/images/diavola.png",
      quantity: 0,
      description: "Tra le pizze, la pizza Diavola è quella più semplice e più amata; una fragrante pizza fatta in casa con pomodoro, mozzarella, olio e basilico."
    },
    {
      id: 3,
      name: "Marinara",
      price: 7.99,
      image: "https://raw.githubusercontent.com/zoelounge/menupizza/main/images/marinara.png",
      quantity: 0,
      description: "Tra le pizze, la pizza Marinara è quella più semplice e più amata; una fragrante pizza fatta in casa con pomodoro, mozzarella, olio e basilico."
    },
    {
      id: 4,
      name: "Bottarga",
      price: 10.99,
      image: "https://raw.githubusercontent.com/zoelounge/menupizza/main/images/bottarga.png",
      quantity: 0,
      description: "Tra le pizze, la pizza Bottarga è quella più semplice e più amata; una fragrante pizza fatta in casa con pomodoro, mozzarella, olio e basilico."
    },
    {
      id: 5,
      name: "Frutti di mare",
      price: 11.99,
      image: "https://raw.githubusercontent.com/zoelounge/menupizza/main/images/mare.png",
      quantity: 0,
      description: "Tra le pizze, la pizza Frutti di mare è quella più semplice e più amata; una fragrante pizza fatta in casa con pomodoro, mozzarella, olio e basilico."
    }
  ]);

  private cart = signal<Pizza[]>([]);

  constructor() {}

  getPizzas() {
    return this.pizzas;
  }

  getCart() {
    return this.cart;
  }

  getPizzaById(id: number) {
    return this.pizzas().find(pizza => pizza.id === id);
  }

  addToCart(pizza: Pizza) {
    const currentCart = this.cart();
    const existingPizza = currentCart.find(p => p.id === pizza.id);
    
    if (existingPizza) {
      existingPizza.quantity++;
      this.cart.set([...currentCart]);
    } else {
      const pizzaToAdd = { ...pizza, quantity: 1 };
      this.cart.set([...currentCart, pizzaToAdd]);
    }
  }

  removeFromCart(pizzaId: number) {
    const currentCart = this.cart();
    const updatedCart = currentCart.filter(pizza => pizza.id !== pizzaId);
    this.cart.set(updatedCart);
  }

  getTotalPrice(): number {
    return this.cart().reduce((total, pizza) => total + (pizza.price * pizza.quantity), 0);
  }
} 