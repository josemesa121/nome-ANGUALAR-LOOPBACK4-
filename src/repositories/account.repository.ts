import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Account, AccountRelations, Workout} from '../models';
import {WorkoutRepository} from './workout.repository';

export type Credentials = {
  email: string;
  password: string;
};

export class AccountRepository extends DefaultCrudRepository<
  Account,
  typeof Account.prototype.id,
  AccountRelations
  > {

  public readonly workouts: HasManyRepositoryFactory<Workout, typeof Account.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('WorkoutRepository') protected workoutRepositoryGetter: Getter<WorkoutRepository>,
  ) {
    super(Account, dataSource);
    this.workouts = this.createHasManyRepositoryFactoryFor('workouts', workoutRepositoryGetter,);
    this.registerInclusionResolver('workouts', this.workouts.inclusionResolver);
  }
}
