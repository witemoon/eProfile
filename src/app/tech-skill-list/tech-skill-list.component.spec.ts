import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechSkillListComponent } from './tech-skill-list.component';

describe('TechSkillListComponent', () => {
  let component: TechSkillListComponent;
  let fixture: ComponentFixture<TechSkillListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechSkillListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechSkillListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
