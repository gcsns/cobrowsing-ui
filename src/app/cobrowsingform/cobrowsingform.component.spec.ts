import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CobrowsingformComponent } from './cobrowsingform.component';

describe('CobrowsingformComponent', () => {
  let component: CobrowsingformComponent;
  let fixture: ComponentFixture<CobrowsingformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CobrowsingformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CobrowsingformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
