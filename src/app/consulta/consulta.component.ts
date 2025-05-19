import { Component, OnInit, inject } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { ClienteService } from '../services/cliente.service';
import { Cliente } from '../cadastro/cliente';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consulta',
  imports: [
    MatInputModule, 
    MatCardModule, 
    FlexLayoutModule, 
    FormsModule, 
    MatTableModule, 
    MatIconModule,
    MatButtonModule,
    CommonModule],
  templateUrl: './consulta.component.html',
  styleUrl: './consulta.component.scss'
})
export class ConsultaComponent implements OnInit {
  private snackBar = inject(MatSnackBar);
  nomeBusca = "";
  clientes: Cliente[] = [];
  colunasTable = ['id', 'nome', 'cpf', 'dataNascimento', 'email', 'acoes'];

  constructor(
    private clienteService: ClienteService,
    private route: Router
  ) { }
  
  ngOnInit(): void {
    this.clientes = this.clienteService.pesquisarClientes("");
  }

  pesquisar() {
    this.clientes = this.clienteService.pesquisarClientes(this.nomeBusca);
  }

  preparaEditar(id: string) {
    this.route.navigate(['cadastro'], { queryParams: { "id": id } });
  }

  preparaDeletar(cliente: Cliente) {
    cliente.deletando = true;
  }

  deletar(cliente: Cliente) {
    this.clienteService.deletar(cliente);
    this.clientes = this.clienteService.pesquisarClientes("");
    this.snackBar.open("Cliente deletado com sucesso!", "OK");
  }

}
