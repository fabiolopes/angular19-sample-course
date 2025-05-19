import { Routes } from '@angular/router';
import { ConsultaComponent } from './consulta/consulta.component';
import { CadastroComponent } from './cadastro/cadastro.component';

export const routes: Routes = [
    { path: 'cadastro', component: CadastroComponent },
    { path: 'consulta', component: ConsultaComponent }
];
