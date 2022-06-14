import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchEntryComponent } from './match-entry.component';

describe('MatchEntryComponent', () => {
  let component: MatchEntryComponent;
  let fixture: ComponentFixture<MatchEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatchEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
