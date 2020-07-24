import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Cobrowsing2Component } from './cobrowsing2.component';

describe('Cobrowsing2Component', () => {
  let component: Cobrowsing2Component;
  let fixture: ComponentFixture<Cobrowsing2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Cobrowsing2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Cobrowsing2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
