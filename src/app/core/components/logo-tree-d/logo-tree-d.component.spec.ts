import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoTreeDComponent } from './logo-tree-d.component';

describe('LogoTreeDComponent', () => {
  let component: LogoTreeDComponent;
  let fixture: ComponentFixture<LogoTreeDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogoTreeDComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoTreeDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
