import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AljanComponent } from './aljan.component';

describe('AljanComponent', () => {
  let component: AljanComponent;
  let fixture: ComponentFixture<AljanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AljanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AljanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
