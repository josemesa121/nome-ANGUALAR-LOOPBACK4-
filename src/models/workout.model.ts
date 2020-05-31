import {Entity, model, property, hasMany} from '@loopback/repository';
import {AccountWithRelations} from './account.model';
import {Sett} from './sett.model';

@model()
export class Workout extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
    required: true,
  })
  swimmers: number;

  @property({
    type: 'date',
    default: null,
  })
  modified_at?: string;

  @property({
    type: 'number',
  })
  accountId?: number;

  @hasMany(() => Sett)
  sets: Sett[];

  constructor(data?: Partial<Workout>) {
    super(data);
  }
}

export interface WorkoutRelations {
  // describe navigational properties here
  account?: AccountWithRelations;
}

export type WorkoutWithRelations = Workout & WorkoutRelations;
