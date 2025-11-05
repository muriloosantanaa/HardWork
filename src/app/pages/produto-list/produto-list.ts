import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoService, Produto } from '../../services/produto.service';

@Component({
  selector: 'app-produto-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './produto-list.html',
  styleUrls: ['./produto-list.css']
})
export class ProdutoList implements OnInit {
  produtos: Produto[] = [];

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos() {
    this.produtoService.listarProdutos().subscribe({
      next: (data) => this.produtos = data,
      error: (err) => console.error('Erro ao carregar produtos', err)
    });
  }
}
