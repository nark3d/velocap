
const decoratorMock = jest.fn().mockImplementation(
  (_target: Record<string, unknown>, _propertyKey: string, _descriptor: PropertyDescriptor) => _descriptor
);

jest.mock('../../lib/abstract/abstract.entity', () => ({
  AbstractEntity: jest.fn(),
}));

jest.mock('../../day/entities/day.entity', () => ({
  Day: jest.fn().mockImplementation(() => 'testDay'),
}));

const mockManyToOne = jest.fn().mockImplementation(decoratorMock);

jest.mock('typeorm', () => ({
  ManyToOne: mockManyToOne,
  JoinColumn: jest.fn().mockImplementation(decoratorMock),
  Column: jest.fn().mockImplementation(decoratorMock),
  Index: jest.fn().mockImplementation(decoratorMock),
  Entities: jest.fn().mockImplementation(decoratorMock),
  Entity: jest.fn().mockImplementation(decoratorMock),
}));

import {Sprint} from './sprint.entity';

describe('Day', () => {
  it('should run the ManyToOne Decorator with a callback', () => {
    new Sprint();
    expect(mockManyToOne.mock.calls[0][0]().getMockImplementation()()).toEqual('testDay');
    expect(mockManyToOne.mock.calls[1][0]().getMockImplementation()()).toEqual('testDay');

  })
});
