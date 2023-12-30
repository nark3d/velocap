const decoratorMock = jest.fn().mockImplementation((_target: Record<string, unknown>, _propertyKey: string, _descriptor: PropertyDescriptor) => _descriptor);
const mockManyToOne = jest.fn().mockImplementation(decoratorMock);

jest.mock('typeorm', () => {
  return {
    ManyToOne: mockManyToOne,
    JoinColumn: jest.fn().mockImplementation(decoratorMock),
    Column: jest.fn().mockImplementation(decoratorMock),
    Index: jest.fn().mockImplementation(decoratorMock),
    Entities: jest.fn().mockImplementation(decoratorMock),
    Entity: jest.fn().mockImplementation(decoratorMock),
  };
});

jest.mock('../../availability/entities/availability.entity', () => ({
    Availability: jest.fn().mockImplementation(() => 'testAvailability'),
}));
jest.mock('../../activity-type/entities/activity-type.entity', () => ({
    ActivityType: jest.fn().mockImplementation(() => 'testActivityType'),
}));
jest.mock('../../lib/abstract/abstract.entity', () => ({
  AbstractEntity: jest.fn(),
}));

import {Activity} from './activity.entity';

describe('Activity', () => {
  it('should run the ManyToOne Decorator with a callback', () => {
    new Activity();
    expect(mockManyToOne.mock.calls[0][0]().getMockImplementation()()).toEqual('testAvailability');
    expect(mockManyToOne.mock.calls[1][0]().getMockImplementation()()).toEqual('testActivityType');
  })
});
