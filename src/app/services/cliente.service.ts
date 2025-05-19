import { Injectable } from '@angular/core';
import { Cliente } from '../cadastro/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  static readonly REPO_CLIENTES = "_CLIENTES";

  constructor() { 
    console.log("Iniciando serviço de clientes");
   }

  salvar(cliente: Cliente) {
    const storageClientes = this.obterStorage();
    if(storageClientes.find(c => c.cpf === cliente.cpf)) {
      alert("Cliente já cadastrado!");
      return;
    }
    storageClientes.push(cliente);
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(storageClientes));
  }

  obterStorage(): Cliente[] {
    const repoClientes = localStorage.getItem(ClienteService.REPO_CLIENTES);
    if(repoClientes) {
      const clientes: Cliente[] = JSON.parse(repoClientes);
      return clientes;
    }

    const clientes: Cliente[] = [];
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(clientes));
    return clientes;
  }

  pesquisarClientes(nomeBusca: string): Cliente[] {
    const clientes = this.obterStorage();
    if(!nomeBusca) {
      return clientes;
    }
    return clientes.filter(c => c.nome?.toLowerCase().indexOf(nomeBusca.toLowerCase()) !== -1);  ;
  }

  buscaClientePorId(id: string): Cliente | undefined {
    const clientes = this.obterStorage();
    return clientes.find(c => c.id === id);
  }

  atualizar(cliente: Cliente) {
    const storage = this.obterStorage();
    storage.forEach(c => {
      if(c.id === cliente.id) {
        Object.assign(c, cliente);
      }
    });
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(storage));
  }

  deletar(cliente: Cliente) {
    const storage = this.obterStorage();
    const filteredStorage = storage.filter(c=> c.id !== cliente.id);
    localStorage.setItem(ClienteService.REPO_CLIENTES, JSON.stringify(filteredStorage));
  }
}
