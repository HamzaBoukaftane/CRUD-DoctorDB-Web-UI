import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifyingPageComponent } from './modifying-page.component';

describe('ModifyingPageComponent', () => {
  let component: ModifyingPageComponent;
  let fixture: ComponentFixture<ModifyingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModifyingPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifyingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
