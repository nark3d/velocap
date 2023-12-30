import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UrlValidator } from '../../../shared/validators/url';
import { SettingService } from '../../../shared/services/http/setting.service';
import { NotificationService } from '../../../modules/alert/services/notification.service';
import { JiraService } from '../../../shared/services/http/jira.service';

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
    private notificationService: NotificationService
  ) {}

  hideToken = true;
  formGroup = this.formBuilder.group({
    jiraUrl: ['', [Validators.required, UrlValidator.validate]],
    jiraToken: ['', Validators.required],
    jiraEmail: ['', [Validators.required, Validators.email]],
    jiraProject: ['']
  });

  connectionStatus = false;
  jiraProjects = [{ name: 'test', key: 'test' }];


  ngOnInit() {
    this.settingService.getByKey('JiraUrl').subscribe({
      next: setting => {
        this.formGroup.controls.jiraUrl.setValue(setting.value);
      }
    });
    this.settingService.getByKey('JiraToken').subscribe({
      next: setting => {
        this.formGroup.controls.jiraToken.setValue(setting.value);
      }
    });
    this.settingService.getByKey('JiraEmail').subscribe({
      next: setting => {
        this.formGroup.controls.jiraEmail.setValue(setting.value);
      }
    });
  }
  async onSubmit() {
    await Promise.all([
      this.settingService.updateByKey('JiraUrl', this.formGroup.controls.jiraUrl.value || ''),
      this.settingService.updateByKey('JiraToken', this.formGroup.controls.jiraToken.value || ''),
      this.settingService.updateByKey('JiraEmail', this.formGroup.controls.jiraEmail.value || '')
    ]);
    this.notificationService.success('Jira settings saved');
  }

  async testConnection() {
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
   }

  formErrors(formControl: AbstractControl): string | void {
    if (formControl.hasError('required')) {
      return 'You must enter a value';
    }

    if (formControl.hasError('email')) {
      return 'Not a valid email';
    }

    if (formControl.hasError('invalidUrl')) {
      return 'Not a valid URL';
    }
  }
}
