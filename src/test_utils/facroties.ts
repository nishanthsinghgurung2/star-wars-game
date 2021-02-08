import * as Factory from 'factory.ts';
import faker from 'faker';
import { Person, Starship } from '../client/client_types';

export const starshipFactory = Factory.Sync.makeFactory<Starship>({
  __typename: Factory.each(() => faker.random.word()),
  id: Factory.each(() => faker.random.uuid()),
  name: Factory.each(() => faker.random.word()),
  model: Factory.each(() => faker.random.word()),
  length: Factory.each(() => faker.random.float()),
  cargoCapacity: Factory.each(() => faker.random.float()),
  hyperdriveRating: Factory.each(() => faker.random.float()),
});

export const peopleFactory = Factory.Sync.makeFactory<Person>({
  __typename: Factory.each(() => faker.random.word()),
  id: Factory.each(() => faker.random.uuid()),
  name: Factory.each(() => faker.random.word()),
  birthYear: Factory.each(() => faker.random.word()),
  mass: Factory.each(() => faker.random.float()),
  height: Factory.each(() => faker.random.float()),
});

export const entityFactories = {
  starships: starshipFactory,
  people: peopleFactory,
};

export const starshipStaticFactory = Factory.Sync.makeFactory<Starship>({
  __typename: 'starship',
  id: '12345',
  name: 'jedi star fighter',
  model: 'delta-7 model',
  length: 10,
  cargoCapacity: 1000,
  hyperdriveRating: 1.5,
});

export const peopleStaticFactory = Factory.Sync.makeFactory<Person>({
  __typename: 'person',
  id: '666',
  name: 'jedi',
  birthYear: '11BB',
  mass: 81.5,
  height: 175,
});

export const entityStaticFactories = {
  starships: starshipStaticFactory,
  people: peopleStaticFactory,
};
