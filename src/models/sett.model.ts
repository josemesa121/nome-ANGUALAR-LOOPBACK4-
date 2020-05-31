import {Entity, model, property} from '@loopback/repository';
import {WorkoutWithRelations} from './workout.model';

@model()
export class Sett extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: number;

  @property({
    type: 'string',
    default: null,
  })
  name?: string;

  @property({
    type: 'number',
    required: true,
  })
  reps: number;

  @property({
    type: 'number',
    required: true,
  })
  distance: number;

  @property({
    type: 'number',
    required: true,
  })
  pace1: number;

  @property({
    type: 'number',
    default: null,
  })
  pace2?: number;

  @property({
    type: 'number',
    default: null,
  })
  pace3?: number;

  @property({
    type: 'number',
    default: null,
  })
  pace4?: number;

  @property({
    type: 'number',
    default: null,
  })
  pace5?: number;

  @property({
    type: 'number',
    required: true,
  })
  rest: number;

  @property({
    type: 'number',
    required: true,
  })
  big_rest: number;

  @property({
    type: 'number',
    default: null,
  })
  invterval?: number;

  @property({
    type: 'number',
    default: null,
  })
  tbs?: number;

  @property({
    type: 'number',
    default: null,
  })
  order?: number;

  @property({
    type: 'number',
  })
  workoutId?: number;

  constructor(data?: Partial<Sett>) {
    super(data);
  }
}

export interface SetRelations {
  // describe navigational properties here
  workout?: WorkoutWithRelations;
}

export type SetWithRelations = Sett & SetRelations;
