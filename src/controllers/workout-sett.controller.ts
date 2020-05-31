import {Count, CountSchema, Filter, repository, Where} from '@loopback/repository';
import {get, getModelSchemaRef, getWhereSchemaFor, param, patch, post, requestBody} from '@loopback/rest';
import {Sett, Workout} from '../models';
import {WorkoutRepository} from '../repositories';

export class WorkoutSettController {
  constructor(
    @repository(WorkoutRepository) protected workoutRepository: WorkoutRepository,
  ) {}

  @get('/workouts/{id}/setts', {
    responses: {
      '200': {
        description: 'Array of Workout has many Sett',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Sett)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Sett>,
  ): Promise<Sett[]> {
    return this.workoutRepository.sets(id).find(filter);
  }

  @post('/workouts/{id}/setts', {
    responses: {
      '200': {
        description: 'Workout model instance',
        content: {'application/json': {schema: getModelSchemaRef(Sett)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Workout.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sett, {
            title: 'NewSettInWorkout',
            exclude: ['id'],
            optional: ['workoutId']
          }),
        },
      },
    }) sett: Omit<Sett, 'id'>,
  ): Promise<Sett> {
    return this.workoutRepository.sets(id).create(sett);
  }

  @patch('/workouts/{id}/setts', {
    responses: {
      '200': {
        description: 'Workout.Sett PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sett, {partial: true}),
        },
      },
    })
    sett: Partial<Sett>,
    @param.query.object('where', getWhereSchemaFor(Sett)) where?: Where<Sett>,
  ): Promise<Count> {
    return this.workoutRepository.sets(id).patch(sett, where);
  }

  // @del('/workouts/{id}/setts', {
  //   responses: {
  //     '200': {
  //       description: 'Workout.Sett DELETE success count',
  //       content: {'application/json': {schema: CountSchema}},
  //     },
  //   },
  // })
  // async delete(
  //   @param.path.number('id') id: number,
  //   @param.query.object('where', getWhereSchemaFor(Sett)) where?: Where<Sett>,
  // ): Promise<Count> {
  //   return this.workoutRepository.sets(id).delete(where);
  // }
}
