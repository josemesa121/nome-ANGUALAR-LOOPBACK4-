import {authenticate} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {Count, CountSchema, Filter, FilterExcludingWhere, repository, Where} from '@loopback/repository';
import {del, get, getFilterSchemaFor, getModelSchemaRef, getWhereSchemaFor, param, patch, post, requestBody} from '@loopback/rest';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import {Sett, Workout} from '../models';
import {AccountRepository, WorkoutRepository} from '../repositories';

export class WorkoutController {
  constructor(
    @repository(WorkoutRepository)
    public workoutRepository: WorkoutRepository,
    @repository(AccountRepository)
    public accountRepository: AccountRepository,
  ) {}

  @post('/workouts', {
    responses: {
      '200': {
        description: 'Workout model instance',
        content: {'application/json': {schema: getModelSchemaRef(Workout)}},
      },
    },
  })
  @authenticate('jwt')
  async create(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Workout, {
            title: 'NewWorkout',
            exclude: ['id'],
          }),
        },
      },
    })
    workout: Omit<Workout, 'id'>,
  ): Promise<Workout> {
    return this.workoutRepository.create(workout);
  }

  // @get('/workouts/count', {
  //   responses: {
  //     '200': {
  //       description: 'Workout model count',
  //       content: {'application/json': {schema: CountSchema}},
  //     },
  //   },
  // })
  // @authenticate('jwt')
  // async count(
  //   @inject(SecurityBindings.USER)
  //   currentUserProfile: UserProfile,
  //   @param.where(Workout) where?: Where<Workout>,
  // ): Promise<Count> {
  //   return this.workoutRepository.count(where);
  // }

  @get('/workouts', {
    responses: {
      '200': {
        description: 'Array of Workout model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Workout, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async findByAccount(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
    @param.query.object('filter', getFilterSchemaFor(Workout)) filter?: Filter<Workout>,
  ): Promise<Workout[]> {
    const userId = currentUserProfile[securityId];
    return this.workoutRepository.find(filter);
  }

  @patch('/workouts', {
    responses: {
      '200': {
        description: 'Workout PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authenticate('jwt')
  async updateAll(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Workout, {partial: true}),
        },
      },
    })
    workout: Workout,
    @param.where(Workout) where?: Where<Workout>,
  ): Promise<Count> {
    return this.workoutRepository.updateAll(workout, where);
  }

  @get('/workouts/{id}', {
    responses: {
      '200': {
        description: 'Workout model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Workout, {includeRelations: true}),
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async findById(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
    @param.path.number('id') id: number,
    @param.filter(Workout, {exclude: 'where'}) filter?: FilterExcludingWhere<Workout>
  ): Promise<Workout> {
    return this.workoutRepository.findById(id, filter);
  }

  @patch('/workouts/{id}', {
    responses: {
      '204': {
        description: 'Workout PATCH success',
      },
    },
  })
  @authenticate('jwt')
  async updateById(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Workout, {partial: true}),
        },
      },
    })
    workout: Workout,
  ): Promise<any> {
    const userId = currentUserProfile[securityId];
    const workoutFound = await this.workoutRepository.findById(id);
    if (userId !== workoutFound.accountId) {
      return {status: 'unauthorized', message: 'No puedes editar o eliminar iformación de otro usuario.'};
    }

    await this.workoutRepository.updateById(id, workout);
  }

  // @put('/workouts/{id}', {
  //   responses: {
  //     '204': {
  //       description: 'Workout PUT success',
  //     },
  //   },
  // })
  // @authenticate('jwt')
  // async replaceById(
  //   @inject(SecurityBindings.USER)
  //   currentUserProfile: UserProfile,
  //   @param.path.number('id') id: number,
  //   @requestBody() workout: Workout,
  // ): Promise<any> {
  //   const userId = currentUserProfile[securityId];
  //   const workoutFound = await this.workoutRepository.findById(id);
  //   if (userId !== workoutFound.accountId) {
  //     return {status: 'unauthorized', message: 'No puedes editar o eliminar iformación de otro usuario.'};
  //   }

  //   await this.workoutRepository.replaceById(id, workout);
  // }

  @del('/workouts/{id}', {
    responses: {
      '204': {
        description: 'Workout DELETE success',
      },
    },
  })
  @authenticate('jwt')
  async deleteById(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
    @param.path.number('id') id: number
  ): Promise<any> {
    const userId = currentUserProfile[securityId];
    const workoutFound = await this.workoutRepository.findById(id);
    if (userId !== workoutFound.accountId) {
      return {status: 'unauthorized', message: 'No puedes editar o eliminar iformación de otro usuario.'};
    }

    await this.workoutRepository.deleteById(id);
  }



  @del('/workouts/{id}/setts', {
    responses: {
      '200': {
        description: 'Workout.Sett DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authenticate('jwt')
  async delete(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Sett)) where?: Where<Sett>,
  ): Promise<any> {
    const userId = currentUserProfile[securityId];
    const workoutFound = await this.workoutRepository.findById(id);
    if (userId !== workoutFound.accountId) {
      return {status: 'unauthorized', message: 'No puedes editar o eliminar iformación de otro usuario.'};
    }

    return this.workoutRepository.sets(id).delete(where);
  }


}
