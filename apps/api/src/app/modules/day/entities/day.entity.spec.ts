
jest.mock('../../availability/entities/availability.entity', () => ({
    Availability: jest.fn().mockImplementation(() => 'testAvailability'),
}));

jest.mock('../../lib/abstract/abstract.entity', () => ({ AbstractEntity: jest.fn() }));

const decoratorMock = jest.fn().mockImplementation((_target: Record<string, unknown>, _propertyKey: string, _descriptor: PropertyDescriptor) => _descriptor);
const mockOneToMany = jest.fn().mockImplementation(decoratorMock);

jest.mock('typeorm', () => ({
    OneToMany: mockOneToMany,
    Column: jest.fn().mockImplementation(decoratorMock),
    Index: jest.fn().mockImplementation(decoratorMock),
    Entity: jest.fn().mockImplementation(decoratorMock),
}));

import {Day} from './day.entity';

describe('Day', () => {
  it('should run the OneToMany Decorator with a callback', () => {
    new Day();
    expect(mockOneToMany.mock.calls[0][0]().getMockImplementation()()).toEqual('testAvailability');
    expect(mockOneToMany.mock.calls[0][1]({ day: 'testDayInverse' })).toEqual('testDayInverse');
  });
});
