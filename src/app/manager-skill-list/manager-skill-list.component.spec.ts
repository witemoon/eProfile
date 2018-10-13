import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerSkillListComponent } from './manager-skill-list.component';

describe('ManagerSkillListComponent', () => {
  let component: ManagerSkillListComponent;
  let fixture: ComponentFixture<ManagerSkillListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerSkillListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerSkillListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
