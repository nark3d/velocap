jest.mock('../../member/entities/member.entity', () => ({
  Member: jest.fn().mockImplementation(() => 'testMember'),
}));
jest.mock('../../day/entities/day.entity', () => ({
  Day: jest.fn().mockImplementation(() => 'testDay'),
}));
jest.mock('../../activity/entities/activity.entity', () => ({
  Activity: jest.fn().mockImplementation(() => 'testActivity'),
}));
jest.mock('../../lib/abstract/abstract.entity', () => ({ AbstractEntity: jest.fn() }));

const decoratorMock = jest.fn().mockImplementation(
  (_target: Record<string, unknown>, _propertyKey: string, _descriptor: PropertyDescriptor) => _descriptor
);
const mockManyToOne = jest.fn().mockImplementation(decoratorMock);
const mockOneToMany = jest.fn().mockImplementation(decoratorMock);
jest.mock('typeorm', () => ({
    ManyToOne: mockManyToOne,
    OneToMany: mockOneToMany,
    JoinColumn: jest.fn().mockImplementation(decoratorMock),
    Column: jest.fn().mockImplementation(decoratorMock),
    Index: jest.fn().mockImplementation(decoratorMock),
    Entity: jest.fn().mockImplementation(decoratorMock),
}));

import {Availability} from './availability.entity';

describe('Availability', () => {
  it('should run the ManyToOne and OneToMany Decorators with a callback', () => {
    new Availability();
    expect(mockManyToOne.mock.calls[0][0]()()).toEqual('testMember');
    expect(mockManyToOne.mock.calls[0][1]({availability: 'testMemberInverse'})).toEqual('testMemberInverse');
    expect(mockManyToOne.mock.calls[1][0]()()).toEqual('testDay');
    expect(mockManyToOne.mock.calls[1][1]({availability: 'testDayInverse' })).toEqual(  'testDayInverse');
    expect(mockOneToMany.mock.calls[0][0]()()).toEqual('testActivity' );
    expect(mockOneToMany.mock.calls[0][1]({availabilityId: 'testActivityInverse' })).toEqual(  'testActivityInverse');
  });
});

