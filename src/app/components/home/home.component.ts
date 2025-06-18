import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-overlay"></div>
      <div class="container">
        <div class="row align-items-center min-vh-100">
          <div class="col-lg-6">
            <div class="hero-content">
              <h1 class="hero-title">
                Le Migliori Pizze <span class="text-warning">Artigianali</span>
              </h1>
              <p class="hero-subtitle">
                Gusta l'autenticità della pizza napoletana preparata con ingredienti freschi 
                e la passione di sempre. Consegna rapida e servizio impeccabile.
              </p>
              <div class="hero-buttons">
                <button class="btn btn-warning btn-lg me-3" (click)="goToMenu()">
                  <i class="bi bi-pizza-slice me-2"></i>
                  Ordina Ora
                </button>
                <button class="btn btn-outline-light btn-lg" (click)="goToMenu()">
                  <i class="bi bi-eye me-2"></i>
                  Vedi Menu
                </button>
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="hero-image">
              <img src="assets/logo.jpeg" alt="Pizza Artigianale" class="img-fluid rounded-3 shadow-lg">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section py-5">
      <div class="container">
        <div class="row text-center mb-5">
          <div class="col-12">
            <h2 class="section-title">Perché Scegliere Noi</h2>
            <p class="section-subtitle">La qualità è la nostra priorità</p>
          </div>
        </div>
        <div class="row g-4">
          <div class="col-md-4">
            <div class="feature-card text-center p-4">
              <div class="feature-icon mb-3">
                <i class="bi bi-clock text-warning"></i>
              </div>
              <h4>Consegna Rapida</h4>
              <p>Consegna in 30 minuti o pizza gratis! Il nostro impegno per la velocità.</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="feature-card text-center p-4">
              <div class="feature-icon mb-3">
                <i class="bi bi-star text-warning"></i>
              </div>
              <h4>Ingredienti Freschi</h4>
              <p>Solo ingredienti di prima qualità, selezionati ogni giorno per te.</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="feature-card text-center p-4">
              <div class="feature-icon mb-3">
                <i class="bi bi-heart text-warning"></i>
              </div>
              <h4>Passione Artigianale</h4>
              <p>Ricette tramandate di generazione in generazione, con amore e dedizione.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section py-5 bg-warning">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-8">
            <h3 class="text-dark mb-3">Pronto per un'esperienza culinaria unica?</h3>
            <p class="text-dark mb-0">Scopri il nostro menu completo e ordina la tua pizza preferita!</p>
          </div>
          <div class="col-lg-4 text-lg-end">
            <button class="btn btn-dark btn-lg" (click)="goToMenu()">
              <i class="bi bi-arrow-right me-2"></i>
              Esplora Menu
            </button>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero-section {
      background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
      position: relative;
      color: white;
      overflow: hidden;
    }

    .hero-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.3);
      z-index: 1;
    }

    .hero-section .container {
      position: relative;
      z-index: 2;
    }

    .hero-title {
      font-size: 3.5rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
      line-height: 1.2;
    }

    .hero-subtitle {
      font-size: 1.25rem;
      margin-bottom: 2rem;
      opacity: 0.9;
      line-height: 1.6;
    }

    .hero-buttons {
      margin-bottom: 2rem;
    }

    .hero-image img {
      max-width: 100%;
      height: auto;
      border: 4px solid rgba(255, 255, 255, 0.2);
    }

    .features-section {
      background-color: #f8f9fa;
    }

    .section-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: #2a5298;
      margin-bottom: 1rem;
    }

    .section-subtitle {
      font-size: 1.1rem;
      color: #6c757d;
      margin-bottom: 3rem;
    }

    .feature-card {
      background: white;
      border-radius: 15px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      height: 100%;
    }

    .feature-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    }

    .feature-icon i {
      font-size: 3rem;
    }

    .feature-card h4 {
      color: #2a5298;
      font-weight: 600;
      margin-bottom: 1rem;
    }

    .feature-card p {
      color: #6c757d;
      line-height: 1.6;
    }

    .cta-section {
      background: linear-gradient(45deg, #ffc107, #ffca2c);
    }

    @media (max-width: 768px) {
      .hero-title {
        font-size: 2.5rem;
      }
      
      .hero-subtitle {
        font-size: 1.1rem;
      }
      
      .hero-buttons .btn {
        display: block;
        width: 100%;
        margin-bottom: 1rem;
      }
      
      .hero-buttons .btn:last-child {
        margin-bottom: 0;
      }
    }
  `]
})
export class HomeComponent {
  constructor(private router: Router) {}

  goToMenu() {
    this.router.navigate(['/menu']);
  }
} 