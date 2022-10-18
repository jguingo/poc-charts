import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ng2GraphComponent } from './ng2-graph.component';

describe('Ng2GraphComponent', () => {
  let component: Ng2GraphComponent;
  let fixture: ComponentFixture<Ng2GraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Ng2GraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ng2GraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
