import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedaArticoloComponent } from './scheda-articolo.component';

describe('SchedaArticoloComponent', () => {
  let component: SchedaArticoloComponent;
  let fixture: ComponentFixture<SchedaArticoloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SchedaArticoloComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SchedaArticoloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
