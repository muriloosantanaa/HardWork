import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Produto } from './produto.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // Array de produtos no carrinho
  private cartItems: Produto[] = [];

  // Observable para componentes assinarem
  private cartSubject = new BehaviorSubject<Produto[]>([]);
  cart$ = this.cartSubject.asObservable();

  // Estado do modal do carrinho
  private modalOpenSubject = new BehaviorSubject<boolean>(false);
  modalOpen$ = this.modalOpenSubject.asObservable();

  constructor() {}

  // Adiciona um produto ao carrinho
  adicionarProduto(produto: Produto) {
    this.cartItems.push(produto);
    this.cartSubject.next(this.cartItems);
  }

  // Remove um produto do carrinho pelo ID
  removerProduto(id: number) {
    this.cartItems = this.cartItems.filter(p => p.id !== id);
    this.cartSubject.next(this.cartItems);
  }

  // Limpa o carrinho
  limparCarrinho() {
    this.cartItems = [];
    this.cartSubject.next(this.cartItems);
  }

  // Abre o modal do carrinho
  abrirModal() {
    this.modalOpenSubject.next(true);
  }

  // Fecha o modal do carrinho
  fecharModal() {
    this.modalOpenSubject.next(false);
  }

  // Retorna o total de produtos no carrinho
  totalProdutos() {
    return this.cartItems.length;
  }

  // Retorna o total do carrinho (soma dos preços)
  totalValor() {
    return this.cartItems.reduce((acc, p) => acc + p.preco, 0);
  }
}
