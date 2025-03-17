import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotfounedComponent } from './notfouned.component';

describe('NotfounedComponent', () => {
  let component: NotfounedComponent;
  let fixture: ComponentFixture<NotfounedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotfounedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotfounedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
