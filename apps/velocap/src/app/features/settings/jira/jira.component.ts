import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UrlValidator } from '../../../shared/validators/url';
import { SettingService } from '../../../shared/services/http/setting.service';
import { NotificationService } from '../../../modules/alert/services/notification.service';
import { JiraService } from '../../../shared/services/http/jira.service';
import { JiraProject } from '../../../../../../api/src/app/modules/jira-project/entities/jira-project.entity';
import { JiraProjectService } from '../../../shared/services/http/jira-project.service';
import { lastValueFrom } from 'rxjs';
import { Setting } from '../../../../../../api/src/app/modules/setting/entities/setting.entity';

@Component({
  selector: 'velocap-jira',
  templateUrl: './jira.component.html',
  styleUrl: './jira.component.scss',
})
export class JiraComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private settingService: SettingService,
    private jiraService: JiraService,
    private jiraProjectService: JiraProjectService,
    private notificationService: NotificationService
  ) {
  }

  hideToken = true;
  formGroup = this.formBuilder.group({
    jiraUrl: ['', [Validators.required, UrlValidator.validate]],
    jiraToken: ['', Validators.required],
    jiraEmail: ['', [Validators.required, Validators.email]],
    jiraProject: [0]
  });

  connectionStatus = false;
  jiraProjects: JiraProject[] = [];

  async ngOnInit() {
    await this.getProjects();
    await this.populateSettings();
    this.formGroup.get('jiraProject')?.disable();
  }

  private async getProjects(): Promise<void> {
    this.jiraProjects = (await lastValueFrom(this.jiraProjectService.getProjects())).data;
  }

  private async populateSettings(): Promise<void> {
    (await this.fetchSettings()).forEach(setting => this.setFormValue(setting));
  }

  private async fetchSettings(): Promise<Setting[]> {
    return (
      await lastValueFrom(this.settingService.getByKeys(['jiraUrl', 'jiraToken', 'jiraEmail', 'jiraProject']))
    )[0];
  }

  private setFormValue(setting: Setting): void {
    const control =
      this.formGroup.controls[setting.key as keyof typeof this.formGroup.controls] as AbstractControl;
    control && control.setValue(setting.key === 'jiraProject' ? +setting.value : setting.value);
  }

  async onSubmit() {
    await this.settingService.updateByKeys([
      { key: 'jiraUrl', value: this.formGroup.controls.jiraUrl.value || ''},
      { key: 'jiraToken', value: this.formGroup.controls.jiraToken.value || ''},
      { key: 'jiraEmail', value: this.formGroup.controls.jiraEmail.value || ''},
      { key: 'jiraProject', value: this.formGroup.controls.jiraProject.value || 0}
    ]);
    this.notificationService.success('Jira settings saved');
  }

  async connect() {
    await this.onSubmit();
    this.jiraService.testConnection().subscribe({
      next: () => {
        this.notificationService.success('Connection successful');
        this.connectionStatus = true;
        this.formGroup.get('jiraProject')?.enable();
      },
      error: () => {
        this.notificationService.error('Connection failed');
        this.connectionStatus = false;
        this.formGroup.get('jiraProject')?.disable();
      }
    });
    this.jiraProjectService.populate().subscribe({
      next: (projects: [JiraProject[], number]) => {
        this.jiraProjects = projects[0];
      }
    });
  }

  formErrors(formControl: AbstractControl): string | void {
    return formControl.hasError('required') ? 'You must enter a value' :
      formControl.hasError('email') ? 'Not a valid email' :
      formControl.hasError('invalidUrl') ? 'Not a valid URL' :
      undefined;
  }

  getSelectedProjectParam(projectParam: keyof JiraProject) {
    const selectedProject = this.jiraProjects.find(project => project.id === this.formGroup.controls.jiraProject.value);
    return selectedProject ? selectedProject[projectParam] : undefined
  }
}
