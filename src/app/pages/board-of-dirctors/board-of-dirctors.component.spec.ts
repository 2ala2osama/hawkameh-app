import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardOfDirctorsComponent } from './board-of-dirctors.component';

describe('BoardOfDirctorsComponent', () => {
  let component: BoardOfDirctorsComponent;
  let fixture: ComponentFixture<BoardOfDirctorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardOfDirctorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardOfDirctorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
