import {authenticate} from '@loopback/authentication';
import {inject} from '@loopback/core';
import {Count, CountSchema, Filter, FilterExcludingWhere, repository, Where} from '@loopback/repository';
import {del, get, getModelSchemaRef, param, patch, post, requestBody} from '@loopback/rest';
import {SecurityBindings, securityId, UserProfile} from '@loopback/security';
import {Sett} from '../models';
import {SettRepository, WorkoutRepository} from '../repositories';

export class SetController {
  constructor(
    @repository(SettRepository)
    public setRepository: SettRepository,
    @repository(WorkoutRepository)
    public workoutRepository: WorkoutRepository,
  ) {}

  @post('/sets', {
    responses: {
      '200': {
        description: 'Set model instance',
        content: {'application/json': {schema: getModelSchemaRef(Sett)}},
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
          schema: getModelSchemaRef(Sett, {
            title: 'NewSet',
            exclude: ['id'],
          }),
        },
      },
    })
    set: Omit<Sett, 'id'>,
  ): Promise<Sett> {
    return this.setRepository.create(set);
  }

  @get('/sets/count', {
    responses: {
      '200': {
        description: 'Set model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  @authenticate('jwt')
  async count(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
    @param.where(Sett) where?: Where<Sett>,
  ): Promise<Count> {
    return this.setRepository.count(where);
  }

  @get('/sets', {
    responses: {
      '200': {
        description: 'Array of Set model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Sett, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  @authenticate('jwt')
  async find(
    @inject(SecurityBindings.USER)
    currentUserProfile: UserProfile,
    @param.filter(Sett) filter?: Filter<Sett>,
  ): Promise<Sett[]> {
    return this.setRepository.find(filter);
  }

  // @get('/sets/workout/{id}', {
  //   responses: {
  //     '200': {
  //       description: 'Array of Set model instances',
  //       content: {
  //         'application/json': {
  //           schema: {
  //             type: 'array',
  //             items: getModelSchemaRef(set, {includeRelations: true}),
  //           },
  //         },
  //       },
  //     },
  //   },
  // })
  // @authenticate('jwt')
  // async findByWorkout(
  //   @inject(SecurityBindings.USER)
  //   currentUserProfile: UserProfile,
  //   @param.path.number('id') id: number,
  //   @param.query.object('filter', getFilterSchemaFor(set)) filter?: Filter<set>,
  // ): Promise<set[]> {
  //   return this.workoutRepository.sets(id).find(filter);
  // }

  @patch('/sets', {
    responses: {
      '200': {
        description: 'Set PATCH success count',
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
          schema: getModelSchemaRef(Sett, {partial: true}),
        },
      },
    })
    set: Sett,
    @param.where(Sett) where?: Where<Sett>,
  ): Promise<Count> {
    return this.setRepository.updateAll(set, where);
  }

  @get('/sets/{id}', {
    responses: {
      '200': {
        description: 'Set model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Sett, {includeRelations: true}),
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
    @param.filter(Sett, {exclude: 'where'}) filter?: FilterExcludingWhere<Sett>
  ): Promise<Sett> {
    return this.setRepository.findById(id, filter);
  }

  @patch('/sets/{id}', {
    responses: {
      '204': {
        description: 'Set PATCH success',
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
          schema: getModelSchemaRef(Sett, {partial: true}),
        },
      },
    })
    set: Sett,
  ): Promise<any> {
    const userId = currentUserProfile[securityId];
    const setFound = await this.setRepository.findById(id);
    const workoutFound = await this.workoutRepository.findOne({where: {id: setFound.workoutId}});
    if (workoutFound == null || userId !== workoutFound.accountId) {
      return {status: 'unauthorized', message: 'No puedes editar o eliminar iformación de otro usuario.'};
    }

    await this.setRepository.updateById(id, set);
  }

  // @put('/sets/{id}', {
  //   responses: {
  //     '204': {
  //       description: 'Set PUT success',
  //     },
  //   },
  // })
  // @authenticate('jwt')
  // async replaceById(
  //   @inject(SecurityBindings.USER)
  //   currentUserProfile: UserProfile,
  //   @param.path.number('id') id: number,
  //   @requestBody() set: set,
  // ): Promise<any> {
  //   const userId = currentUserProfile[securityId];
  //   const setFound = await this.setRepository.findById(id);
  //   const workoutFound = await this.workoutRepository.findOne({where: {id: setFound.workoutId}});
  //   if (workoutFound == null || userId !== workoutFound.accountId) {
  //     return {status: 'unauthorized', message: 'No puedes editar o eliminar iformación de otro usuario.'};
  //   }
  //   await this.setRepository.replaceById(id, set);
  // }

  @del('/sets/{id}', {
    responses: {
      '204': {
        description: 'Set DELETE success',
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
    const setFound = await this.setRepository.findById(id);
    const workoutFound = await this.workoutRepository.findOne({where: {id: setFound.workoutId}});
    if (workoutFound == null || userId !== workoutFound.accountId) {
      return {status: 'unauthorized', message: 'No puedes editar o eliminar iformación de otro usuario.'};
    }

    return await this.setRepository.deleteById(id);
  }
}
