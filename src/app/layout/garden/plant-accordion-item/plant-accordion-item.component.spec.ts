import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantAccordionItemComponent } from './plant-accordion-item.component';

describe('PlantAccordionItemComponent', () => {
  let component: PlantAccordionItemComponent;
  let fixture: ComponentFixture<PlantAccordionItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantAccordionItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlantAccordionItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
