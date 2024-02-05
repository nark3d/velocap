import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JiraIssuesComponent } from './jira-issues.component';

describe('JiraIssuesComponent', () => {
  let component: JiraIssuesComponent;
  let fixture: ComponentFixture<JiraIssuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JiraIssuesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JiraIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
