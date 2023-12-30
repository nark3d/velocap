import {
  ValidationArguments,
  ValidatorConstraintInterface,
} from 'class-validator';
import { DataSource, FindOptionsWhere } from 'typeorm';
import { UniqueValidationArguments } from '../interfaces/unique-validator.interface';

export abstract class UniqueValidator implements ValidatorConstraintInterface {
  protected constructor(protected readonly dataSource: DataSource) {}

  public async validate<E>(value: string, args: UniqueValidationArguments<E>) {
    const [EntityClass, findCondition = args.property] = args.constraints;
    return (
      (await this.dataSource.getRepository(EntityClass).count({
        where: this.findCondition(findCondition, args, value) as
          | FindOptionsWhere<E>
          | FindOptionsWhere<E>[],
      })) <= 0
    );
  }

  public defaultMessage(args: ValidationArguments) {
    const [EntityClass] = args.constraints;
    const entity = EntityClass.name || 'Entity';
    return `${entity} with the same '${args.property}' already exist`;
  }

  private findCondition<E>(
    findCondition:
      | string
      | ((validationArguments: ValidationArguments) => FindOptionsWhere<E>)
      | keyof E,
    args: UniqueValidationArguments<E>,
    value: string,
  ): FindOptionsWhere<E> | { [x: string]: string } {
    return typeof findCondition === 'function'
      ? findCondition(args)
      : {
          [findCondition || args.property]: value,
        };
  }
}
