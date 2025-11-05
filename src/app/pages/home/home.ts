import { Component, OnInit } from '@angular/core';
import { CommonModule, NgForOf, AsyncPipe } from '@angular/common';
import { ProdutoService, Produto } from '../../services/produto.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NgForOf, AsyncPipe],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  produtos: Produto[] = [];       // Produtos disponíveis
  cartItems: Produto[] = [];      // Produtos no carrinho
  totalValor = 0;                 // Valor total do carrinho
  modalAberto = false;            // Controle do modal

  constructor(
    private produtoService: ProdutoService,
    public cartService: CartService  // Public para usar no template
  ) {}

  ngOnInit(): void {
    // Carregar produtos do Admin
    this.carregarProdutos();

    // Atualiza carrinho sempre que houver mudança
    this.cartService.cart$.subscribe(items => {
      this.cartItems = items;
      this.totalValor = this.cartService.totalValor();
    });

    // Atualiza estado do modal
    this.cartService.modalOpen$.subscribe(open => this.modalAberto = open);
  }

  carregarProdutos(): void {
    this.produtoService.listarProdutos().subscribe({
      next: (data: Produto[]) => this.produtos = data,
      error: (err: any) => console.error('Erro ao carregar produtos:', err)
    });
  }

  // Adiciona produto ao carrinho
  adicionarAoCarrinho(produto: Produto): void {
    this.cartService.adicionarProduto(produto);
  }

  // Remove produto do carrinho
  removerDoCarrinho(id?: number): void {
    if (!id) return;
    this.cartService.removerProduto(id);
  }

  // Abrir/fechar modal
  toggleModal(): void {
    this.cartService.abrirModal();
  }
}
