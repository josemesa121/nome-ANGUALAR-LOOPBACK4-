import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Account,
  Workout,
} from '../models';
import {AccountRepository} from '../repositories';

export class AccountWorkoutController {
  constructor(
    @repository(AccountRepository) protected accountRepository: AccountRepository,
  ) { }

  @get('/accounts/{id}/workouts', {
    responses: {
      '200': {
        description: 'Array of Account has many Workout',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Workout)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Workout>,
  ): Promise<Workout[]> {
    return this.accountRepository.workouts(id).find(filter);
  }

  @post('/accounts/{id}/workouts', {
    responses: {
      '200': {
        description: 'Account model instance',
        content: {'application/json': {schema: getModelSchemaRef(Workout)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Account.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Workout, {
            title: 'NewWorkoutInAccount',
            exclude: ['id'],
            optional: ['accountId']
          }),
        },
      },
    }) workout: Omit<Workout, 'id'>,
  ): Promise<Workout> {
    return this.accountRepository.workouts(id).create(workout);
  }

  @patch('/accounts/{id}/workouts', {
    responses: {
      '200': {
        description: 'Account.Workout PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Workout, {partial: true}),
        },
      },
    })
    workout: Partial<Workout>,
    @param.query.object('where', getWhereSchemaFor(Workout)) where?: Where<Workout>,
  ): Promise<Count> {
    return this.accountRepository.workouts(id).patch(workout, where);
  }

  @del('/accounts/{id}/workouts', {
    responses: {
      '200': {
        description: 'Account.Workout DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Workout)) where?: Where<Workout>,
  ): Promise<Count> {
    return this.accountRepository.workouts(id).delete(where);
  }
}
