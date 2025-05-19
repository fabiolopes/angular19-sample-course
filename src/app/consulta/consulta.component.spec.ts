import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { ConsultaComponent } from './consulta.component';
import { ClienteService } from '../services/cliente.service';

describe('ConsultaComponent', () => {
  let component: ConsultaComponent;
  let fixture: ComponentFixture<ConsultaComponent>;
  let clienteService: ClienteService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaComponent],
      providers: [
        provideNoopAnimations()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    clienteService = TestBed.inject(ClienteService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve buscar clientes', () => {
    const clientes = clienteService.pesquisarClientes("João");
    expect(clientes.length).toBe(1);
  });
});
