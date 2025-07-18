import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FixtureList } from './fixture-list';

describe('FixtureList', () => {
  let component: FixtureList;
  let fixture: ComponentFixture<FixtureList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FixtureList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FixtureList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
