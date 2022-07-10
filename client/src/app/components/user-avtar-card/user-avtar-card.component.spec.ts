import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAvtarCardComponent } from './user-avtar-card.component';

describe('UserAvtarCardComponent', () => {
  let component: UserAvtarCardComponent;
  let fixture: ComponentFixture<UserAvtarCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAvtarCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAvtarCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
