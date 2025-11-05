import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header implements OnInit {
  totalProdutos = 0;

  constructor(private router: Router, private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cart$.subscribe(items => {
      this.totalProdutos = items.length;
    });
  }

  abrirCarrinho() {
    this.cartService.abrirModal();
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
