/* tslint:disable */
import {
  Set,
  Account
} from '../index';

declare var Object: any;
export interface WorkoutInterface {
  "name": string;
  "swimmers": number;
  "modified_at"?: number;
  "id"?: number;
  "accountId"?: number;
  sets?: Set[];
  account?: Account;
}

export class Workout implements WorkoutInterface {
  "name": string;
  "swimmers": number;
  "modified_at": number;
  "id": number;
  "accountId": number;
  sets: Set[];
  account: Account;
  constructor(data?: WorkoutInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Workout`.
   */
  public static getModelName() {
    return "Workout";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Workout for dynamic purposes.
  **/
  public static factory(data: WorkoutInterface): Workout{
    return new Workout(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'Workout',
      plural: 'Workouts',
      path: 'Workouts',
      idName: 'id',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "swimmers": {
          name: 'swimmers',
          type: 'number'
        },
        "modified_at": {
          name: 'modified_at',
          type: 'number'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "accountId": {
          name: 'accountId',
          type: 'number'
        },
      },
      relations: {
        sets: {
          name: 'sets',
          type: 'Set[]',
          model: 'Set',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'workoutId'
        },
        account: {
          name: 'account',
          type: 'Account',
          model: 'Account',
          relationType: 'belongsTo',
                  keyFrom: 'accountId',
          keyTo: 'id'
        },
      }
    }
  }
}
