import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindYourselfComponent } from './find-yourself.component';

describe('FindYourselfComponent', () => {
  let component: FindYourselfComponent;
  let fixture: ComponentFixture<FindYourselfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindYourselfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindYourselfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
