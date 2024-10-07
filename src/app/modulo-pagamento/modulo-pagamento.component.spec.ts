import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuloPagamentoComponent } from './modulo-pagamento.component';

describe('ModuloPagamentoComponent', () => {
  let component: ModuloPagamentoComponent;
  let fixture: ComponentFixture<ModuloPagamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModuloPagamentoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModuloPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
