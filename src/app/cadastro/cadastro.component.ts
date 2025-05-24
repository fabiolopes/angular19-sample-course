import { Component, OnInit, inject } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cliente } from './cliente';
import { ClienteService } from '../services/cliente.service';
import { v4 as uuid } from 'uuid';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask'
import { BrasilapiService } from '../services/brasilapi.service';
import { Estado, Municipio } from '../models/brasilapi.model';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-cadastro',
  imports: [
    FlexLayoutModule, 
    MatCardModule, 
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatIconModule, 
    MatButtonModule, 
    CommonModule,
    NgxMaskDirective,
    MatSelectModule

  ],
  providers: [
    provideNgxMask()
  ],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent implements OnInit {
  private snackBar = inject(MatSnackBar);
  cliente: Cliente = Cliente.newCliente();
  atualizando = false;
  estados: Estado[] = [];
  municipios: Municipio [] = [];

  constructor(
    private clienteService: ClienteService, 
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private brasilApiService: BrasilapiService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      if(params['id']) {
        const cliente = this.clienteService.buscaClientePorId(params['id']);
        if(cliente) {
          this.cliente = cliente;
          this.atualizando = true;
          this.carregarMunicipios();
        }
      }
    });
    this.carregarUFs();
  }

  salvar() {
    if(this.atualizando) {
      this.clienteService.atualizar(this.cliente);
      this.route.navigate(['consulta']);
      this.mostrarMensagem("Cliente atualizado com sucesso!");
      return;
    }
    this.clienteService.salvar({...this.cliente, id: uuid()});
    this.cliente = Cliente.newCliente();
    this.mostrarMensagem("Cliente salvo com sucesso!");
  }

  mostrarMensagem(mensagem: string) {
    this.snackBar.open(mensagem, 'Ok');
  }

  carregarUFs() {
    this.brasilApiService.listarUFs().subscribe( {
      next: listaEstados => {
        this.estados = listaEstados;
        this.estados.sort((a, b) => a.nome.localeCompare(b.nome));
      },
      error: erro => {
        console.log(erro);
      }
    });
  }

  carregarMunicipios() {
    this.brasilApiService.getMunicipiosPorUF(this.cliente.estado).subscribe({
      next: municipios => {
        this.municipios = municipios;
      },
      error: erro => {
        console.log(erro);
      }
    });
  }
}
