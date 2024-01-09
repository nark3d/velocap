import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { JiraComponent } from './jira.component';
import { SettingService } from '../../../shared/services/http/setting.service';
import { JiraService } from '../../../shared/services/http/jira.service';
import { JiraProjectService } from '../../../shared/services/http/jira-project.service';
import { NotificationService } from '../../../modules/alert/services/notification.service';
import { of, throwError } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { ResponseInterface } from '../../../../../../api/src/app/lib/interfaces/response.interface';
import { JiraProject } from '../../../../../../api/src/app/modules/jira-project/entities/jira-project.entity';

describe('JiraComponent', () => {
  let component: JiraComponent;
  let fixture: ComponentFixture<JiraComponent>;
  let settingService: SettingService;
  let jiraService: JiraService;
  let jiraProjectService: JiraProjectService;
  let notificationService: NotificationService;

  let settingServiceMock: Partial<SettingService>;
  let jiraServiceMock: {
    testConnection: jest.Mock;
    populate: jest.Mock;
  };
  let jiraProjectServiceMock: {
    getProjects: jest.Mock;
    populate: jest.Mock;
  };
  let notificationServiceMock: Partial<NotificationService>;


  beforeEach(async () => {
    // Mock services
    settingServiceMock = {
      getByKeys: jest.fn().mockReturnValue(of([
        [{ key: 'jiraUrl', value: 'http://example.com' }],
        1
      ])),
      updateByKeys: jest.fn()
    };
    jiraServiceMock = {
      testConnection: jest.fn().mockReturnValue(of({/* mock response for success */})),
      populate: jest.fn().mockReturnValue(of({/* mock response for success */})),
    };
    jiraProjectServiceMock = {
      getProjects: jest.fn().mockReturnValue(of({
        data: [{ id: 1, name: 'Project1' }],
        meta: { count: 1 }
      } as ResponseInterface<JiraProject>)),
      populate: jest.fn()
    };
    notificationServiceMock = {
      success: jest.fn(),
      error: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [JiraComponent],
      providers: [
        FormBuilder,
        { provide: SettingService, useValue: settingServiceMock },
        { provide: JiraService, useValue: jiraServiceMock },
        { provide: JiraProjectService, useValue: jiraProjectServiceMock },
        { provide: NotificationService, useValue: notificationServiceMock },
      ],
      imports: [ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatIconModule]
    }).compileComponents();

    fixture = TestBed.createComponent(JiraComponent);
    component = fixture.componentInstance;

    // Assign mocked services
    settingService = TestBed.inject(SettingService);
    jiraService = TestBed.inject(JiraService);
    jiraProjectService = TestBed.inject(JiraProjectService);
    notificationService = TestBed.inject(NotificationService);

    jiraServiceMock.testConnection.mockReturnValue(of({/* mock response for success */}));
    jiraProjectServiceMock.populate.mockReturnValue(of({/* mock response for success */}));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('formGroup should be invalid when empty', () => {
    expect(component.formGroup.valid).toBeFalsy();
  });

  // Test the effects of ngOnInit
  it('ngOnInit should initialize settings and projects', async () => {
    await component.ngOnInit();

    // Check if settings are fetched and set
    expect(settingService.getByKeys).toHaveBeenCalled();
    expect(component.formGroup.get('jiraUrl')?.value).toEqual('http://example.com');

    // Check if projects are fetched
    expect(jiraProjectService.getProjects).toHaveBeenCalled();
    expect(component.jiraProjects).toEqual([{ id: 1, name: 'Project1' }]);
  });

  it('onSubmit should update settings', async () => {
    await component.ngOnInit();
    await component.onSubmit();

    expect(settingService.updateByKeys).toHaveBeenCalled();
    expect(notificationService.success).toHaveBeenCalled();
  })

  it('onTestConnection should test connection', async () => {
    await component.ngOnInit();
    await component.connect();

    expect(jiraService.testConnection).toHaveBeenCalled();
    expect(notificationService.success).toHaveBeenCalled();
  });

  it('onTestConnection should show error notification on failure', async () => {
    (jiraServiceMock.testConnection as jest.Mock).mockReturnValue(throwError(() => new Error('Connection failed')));

    await component.ngOnInit();
    await component.connect();

    expect(jiraServiceMock.testConnection).toHaveBeenCalled();
    expect(notificationServiceMock.error).toHaveBeenCalled();
  });

  it('formErrors should return error messages', async () => {
    await component.ngOnInit();
    component.formGroup.controls.jiraUrl.setValue('');
    expect(component.formErrors(component.formGroup.controls.jiraUrl)).toEqual('You must enter a value');
  });

  it('getSelectedProject should return selected project', async () => {
    await component.ngOnInit();
    component.formGroup.controls.jiraProject.setValue(1);
    expect(component.getSelectedProjectParam('name')).toEqual('Project1');
  });
});
