import { ValidationArguments } from 'class-validator';
import { EntitySchema, FindOptionsWhere, ObjectType } from 'typeorm';

export interface UniqueValidationArguments<E> extends ValidationArguments {
  constraints: [
    ObjectType<E> | EntitySchema<E> | string,
    (
      | ((validationArguments: ValidationArguments) => FindOptionsWhere<E>)
      | keyof E
    ),
  ];
}
