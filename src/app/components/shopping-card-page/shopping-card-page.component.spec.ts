import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ShoppingCardPageComponent } from './shopping-card-page.component';

describe('ShoppingCardPageComponent', () => {
  let component: ShoppingCardPageComponent;
  let fixture: ComponentFixture<ShoppingCardPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingCardPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingCardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
