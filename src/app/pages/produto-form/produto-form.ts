import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProdutoService, Produto } from '../../services/produto.service';

@Component({
  selector: 'app-produto-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './produto-form.html',
  styleUrls: ['./produto-form.css']
})
export class ProdutoForm {
  produto: Produto = { nome: '', preco: 0, descricao: '', imagem: '' };

  constructor(private produtoService: ProdutoService) {}

  salvarProduto() {
    if (this.produto.id) {
      this.produtoService.atualizarProduto(this.produto.id, this.produto)
        .subscribe(() => alert('Produto atualizado com sucesso!'));
    } else {
      this.produtoService.criarProduto(this.produto)
        .subscribe(() => {
          alert('Produto criado com sucesso!');
          this.produto = { nome: '', preco: 0, descricao: '', imagem: '' };
        });
    }
  }
}
