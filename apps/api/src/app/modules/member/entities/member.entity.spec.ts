import {Availability} from '../../availability/entities/availability.entity';

const decoratorMock = jest.fn().mockImplementation((_target: Record<string, unknown>, _propertyKey: string, _descriptor: PropertyDescriptor) => _descriptor);
const mockManyToOne = jest.fn().mockImplementation((_target: Record<string, unknown>, _propertyKey: string, _descriptor: PropertyDescriptor) => _descriptor);
const mockOneToMany = jest.fn().mockImplementation((_target: Record<string, unknown>, _propertyKey: string, _descriptor: PropertyDescriptor) => _descriptor);

jest.mock('../../availability/entities/availability.entity', () => ({
  Availability: jest.fn().mockImplementation(() => 'testAvailability'),
}));

jest.mock('../../role/entities/role.entity', () => ({
  Role: jest.fn().mockImplementation(() => 'testRole'),
}));

jest.mock('../../lib/abstract/abstract.entity', () => ({
  AbstractEntity: jest.fn(),
}));

import { Member } from './member.entity';

jest.mock('typeorm', () => {
  return {
    ManyToOne: mockManyToOne,
    OneToMany: mockOneToMany,
    JoinColumn: jest.fn().mockImplementation(decoratorMock),
    Column: jest.fn().mockImplementation(decoratorMock),
    Entity: jest.fn().mockImplementation(decoratorMock),
  };
});

describe('Availability', () => {
  it('should run the ManyToOne and OneToMany Decorators with a callback', () => {
    new Member();
    expect(mockManyToOne.mock.calls[0][0]().getMockImplementation()()).toEqual('testRole');
    expect(mockOneToMany.mock.calls[0][0]().getMockImplementation()()).toEqual('testAvailability');
    expect(mockOneToMany.mock.calls[0][1]({ memberId: 'testMemberInverse' })).toEqual('testMemberInverse');
  });
});
