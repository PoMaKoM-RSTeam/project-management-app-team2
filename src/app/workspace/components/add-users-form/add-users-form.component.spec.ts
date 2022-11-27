import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUsersFormComponent } from './add-users-form.component';

describe('AddUsersFormComponent', () => {
  let component: AddUsersFormComponent;
  let fixture: ComponentFixture<AddUsersFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddUsersFormComponent],
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddUsersFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
