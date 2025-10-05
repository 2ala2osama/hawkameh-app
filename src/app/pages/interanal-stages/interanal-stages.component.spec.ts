import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InteranalStagesComponent } from './interanal-stages.component';

describe('InteranalStagesComponent', () => {
  let component: InteranalStagesComponent;
  let fixture: ComponentFixture<InteranalStagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InteranalStagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InteranalStagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
