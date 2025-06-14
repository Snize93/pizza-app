import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div class="d-flex flex-column justify-content-center align-items-center" style="height: 70vh;">
      <img src="assets/logo.jpeg" alt="Pizza Logo" style="max-width: 300px; width: 100%; height: auto;">
    </div>
  `
})
export class HomeComponent {} 