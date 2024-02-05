import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthCheckModule } from './modules/healthcheck/health-check.module';
import { SnakeNamingStrategy } from 'typeorm-naming-strategy';
import { MemberModule } from './modules/member/member.module';
import { AvailabilityModule } from './modules/availability/availability.module';
import { ActivityModule } from './modules/activity/activity.module';
import { RoleModule } from './modules/role/role.module';
import { DayModule } from './modules/day/day.module';
import { SprintModule } from './modules/sprint/sprint.module';
import { ActivityTypeModule } from './modules/activity-type/activity-type.module';
import { SettingModule } from './modules/setting/setting.module';
import { JiraModule } from './modules/jira/jira.module';
import { JiraProjectModule } from './modules/jira-project/jira-project.module';
import { JiraIssueModule } from './modules/jira-issue/jira-issue.module';
import StorageService from './lib/services/storage.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as 'mysql' | 'sqlite',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
      entities: [],
      logging: true,
      logger: 'advanced-console',
      namingStrategy: new SnakeNamingStrategy(),
    }),
    ActivityModule,
    ActivityTypeModule,
    AvailabilityModule,
    DayModule,
    HealthCheckModule,
    MemberModule,
    RoleModule,
    SettingModule,
    SprintModule,
    JiraModule,
    JiraProjectModule,
    JiraIssueModule,
  ],
  controllers: [],
  providers: [StorageService],
  exports: [StorageService],
})
export class AppModule {}
