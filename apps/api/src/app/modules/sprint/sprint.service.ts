import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sprint } from './entities/sprint.entity';
import {FindManyOptions, Repository} from 'typeorm';
import { AbstractService } from '../../lib/abstract/abstract.service';
import { Day } from '../day/entities/day.entity';
import { DayService } from '../day/day.service';
import {SprintStatistics} from '../../../../../../libs/api-interfaces/src/lib/sprint-statistics';
import {SelectQueryBuilder} from 'typeorm/query-builder/SelectQueryBuilder';
import {SprintAverages} from '../../../../../../libs/api-interfaces/src/lib/sprint-averages';

@Injectable()
export class SprintService extends AbstractService<Sprint> {
  constructor(
    @InjectRepository(Sprint)
    private readonly sprintRepository: Repository<Sprint>,
    private readonly dayService: DayService,
  ) {
    super(sprintRepository);
  }

  findAll(findManyOptions?: FindManyOptions<Sprint>): Promise<[Sprint[], number]> {
    return super.findAll({
        relations: ['startDate'],
        order: {
            startDate: {
              date: 'DESC'
            },
          },
        ...findManyOptions
      });
  }

  async getLastSprint(): Promise<Sprint[]> {
    return await this.sprintRepository.find({
      relations: ['startDate'],
      order: {
        startDate: {
          date: 'DESC'
        }
      },
      take: 1
    });
  }

  private statsJoin(): SelectQueryBuilder<Sprint> {
    return this.sprintRepository
      .createQueryBuilder('s')
      .leftJoinAndSelect('s.startDate', 'sd', 's.start_day_id = sd.id')
      .leftJoinAndSelect('s.endDate', 'ed', 's.end_day_id = ed.id')
      .leftJoinAndSelect('days', 'd', 'd.date BETWEEN sd.date AND ed.date')
      .leftJoinAndSelect('availability', 'a', 'd.id = a.day_id')
      .leftJoinAndSelect('members', 'm', 'a.member_id = m.id')
      .leftJoinAndSelect('roles', 'r', 'm.role_id = r.id')
      .leftJoinAndSelect('activities', 'a2', 'a.id = a2.availability_id')
      .where('r.value = :role', { role: 'Developer' });
  }

  public async stats(): Promise<SprintStatistics[]>{
    return await this.statsJoin()
      .select([
        's.id AS id',
        's.name AS name',
        's.start_points AS startPoints',
        's.end_points AS endPoints',
        's.completed_points AS completedPoints',
        's.start_issues AS startIssues',
        's.end_issues AS endIssues',
        's.completed_issues AS completedIssues',
        'sd.date as startDate',
        'SUM(a.minutes) as availability',
        'SUM(a2.minutes) as activities',
        'SUM(a.minutes) - SUM(a2.minutes) as computed',
      ])
      .groupBy('s.id')
      .orderBy('startDate', 'ASC')
      .getRawMany();
  }

  public async averages(sprints?: number): Promise<SprintAverages> {
    const query: SelectQueryBuilder<Sprint> = this.statsJoin()
      .select([
        'AVG(s.start_points) AS avgStartPoints',
        'AVG(s.end_points) AS avgEndPoints',
        'AVG(s.completed_points) as avgCompletedPoints',
        'AVG(s.start_issues) AS avgStartIssues',
        'AVG(s.end_issues) AS avgEndIssues',
        'AVG(s.completed_issues) AS avgCompletedIssues',
        'AVG(s.completed_points) AS avgCompletedPoints',
        'AVG(s.completed_issues) AS avgCompletedIssues',
        'SUM(a.minutes) / COUNT(DISTINCT(s.id)) AS avgAvailability',
        'SUM(a2.minutes) / COUNT(DISTINCT(s.id)) AS avgActivities',
        'SUM(a.minutes) / COUNT(DISTINCT(s.id)) - SUM(a2.minutes) / COUNT(DISTINCT(s.id)) AS avgDevTime',
      ])
      .orderBy('sd.date', 'ASC');

    this.limitSprints(query, sprints);

    // @todo put this in a decorator
    return query.getRawOne().then((result: any) => ({
        ...result,
        avgPointsPerHour: result.avgCompletedPoints / (result.avgAvailability / 60),
        avgIssuesPerHour: result.avgCompletedIssues / (result.avgAvailability / 60),
    }));
  }

  private limitSprints(queryBuilder: SelectQueryBuilder<Sprint>, sprints?: number): SelectQueryBuilder<Sprint> {
    return sprints && queryBuilder.innerJoin((queryBuilder: SelectQueryBuilder<Sprint> ) =>
      this.limitQuery(queryBuilder, sprints), 't', 's.id = s_id');
  }

  private limitQuery(queryBuilder: SelectQueryBuilder<Sprint>, sprints: number): SelectQueryBuilder<Sprint> {
    return queryBuilder
      .select('s.id')
      .from(Sprint, 's')
      .leftJoin('s.startDate', 'sd')
      .orderBy('sd.date', 'DESC')
      .limit(sprints);
  }

  public async days(id: number): Promise<[Day[], number]> {
    const sprint = await this.findOne(id);
    return await this.dayService.getDateBetween(
      sprint.startDate,
      sprint.endDate,
    );
  }
}

