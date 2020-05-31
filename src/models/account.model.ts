import {Entity, hasMany, model, property} from '@loopback/repository';
import {Workout} from './workout.model';

@model()
export class Account extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      minLength: 2,
      maxLength: 15
    }
  })
  firstName: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      minLength: 3,
      maxLength: 15
    }
  })
  lastName: string;

  @property({
    type: 'string',
    default: null,
  })
  realm?: string;

  @property({
    type: 'string',
    default: null,
  })
  username?: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      minLength: 8
    }
  })
  password: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      format: 'email',
      minLength: 5,
      maxLength: 50,
      transform: ['toLowerCase']
    }
  })
  email: string;

  @property({
    type: 'number',
    default: null,
  })
  emailVerified?: number;

  @property({
    type: 'string',
    default: null,
  })
  verificationToken?: string;

  @hasMany(() => Workout)
  workouts: Workout[];

  constructor(data?: Partial<Account>) {
    super(data);
  }
}

export interface AccountRelations {
  // describe navigational properties here
}

export type AccountWithRelations = Account & AccountRelations;
