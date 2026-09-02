import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterDetailsDialog } from './character-details-dialog';

describe('CharacterDetailsDialog', () => {
  let component: CharacterDetailsDialog;
  let fixture: ComponentFixture<CharacterDetailsDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterDetailsDialog],
    }).compileComponents();

    fixture = TestBed.createComponent(CharacterDetailsDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
