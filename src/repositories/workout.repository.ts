import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Workout, WorkoutRelations, Sett} from '../models';
import {MysqlDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {SettRepository} from './sett.repository';

export class WorkoutRepository extends DefaultCrudRepository<
  Workout,
  typeof Workout.prototype.id,
  WorkoutRelations
> {

  public readonly sets: HasManyRepositoryFactory<Sett, typeof Workout.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('SettRepository') protected settRepositoryGetter: Getter<SettRepository>,
  ) {
    super(Workout, dataSource);
    this.sets = this.createHasManyRepositoryFactoryFor('sets', settRepositoryGetter,);
    this.registerInclusionResolver('sets', this.sets.inclusionResolver);
  }
}
