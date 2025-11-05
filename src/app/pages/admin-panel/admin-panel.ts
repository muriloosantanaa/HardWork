import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProdutoService, Produto } from '../../services/produto.service';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-panel.html',
  styleUrls: ['./admin-panel.css']
})
export class AdminPanel implements OnInit {
  produtos: Produto[] = [];

  produtoSelecionado: Produto = { nome: '', preco: 0, descricao: '', imagem: '' };

  editando = false;

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.listarProdutos();
  }

  listarProdutos() {
    this.produtoService.listarProdutos().subscribe({
      next: (data) => this.produtos = data,
      error: (err) => console.error('Erro ao listar produtos', err)
    });
  }

  salvarProduto() {
    if (this.editando && this.produtoSelecionado.id) {
      this.produtoService.atualizarProduto(this.produtoSelecionado.id, this.produtoSelecionado)
        .subscribe(() => {
          this.listarProdutos();
          this.cancelarEdicao();
        });
    } else {
      this.produtoService.criarProduto(this.produtoSelecionado)
        .subscribe(() => {
          this.listarProdutos();
          this.cancelarEdicao();
        });
    }
  }

  editarProduto(produto: Produto) {
    this.produtoSelecionado = { ...produto };
    this.editando = true;
  }

  deletarProduto(id?: number) {
    if (!id) return;
    this.produtoService.deletarProduto(id).subscribe(() => this.listarProdutos());
  }

  cancelarEdicao() {
    this.editando = false;
    this.produtoSelecionado = { nome: '', preco: 0, descricao: '', imagem: '' };
  }
}
