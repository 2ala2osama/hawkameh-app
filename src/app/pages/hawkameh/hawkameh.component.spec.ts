import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HawkamehComponent } from './hawkameh.component';

describe('HawkamehComponent', () => {
  let component: HawkamehComponent;
  let fixture: ComponentFixture<HawkamehComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HawkamehComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HawkamehComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
