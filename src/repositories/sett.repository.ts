import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {SetRelations, Sett} from '../models';

export class SettRepository extends DefaultCrudRepository<
  Sett,
  typeof Sett.prototype.id,
  SetRelations
  > {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(Sett, dataSource);
  }
}
