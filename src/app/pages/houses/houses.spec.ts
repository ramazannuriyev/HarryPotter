import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Houses } from './houses';
import { provideHttpClient } from '@angular/common/http';

describe('Houses', () => {
  let component: Houses;
  let fixture: ComponentFixture<Houses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Houses],
      providers: [provideHttpClient()],
    }).compileComponents();

    fixture = TestBed.createComponent(Houses);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
