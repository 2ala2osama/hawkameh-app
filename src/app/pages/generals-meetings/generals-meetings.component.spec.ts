import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralsMeetingsComponent } from './generals-meetings.component';

describe('GeneralsMeetingsComponent', () => {
  let component: GeneralsMeetingsComponent;
  let fixture: ComponentFixture<GeneralsMeetingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneralsMeetingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeneralsMeetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
