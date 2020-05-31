/* tslint:disable */
import {
  Workout
} from '../index';

declare var Object: any;
export interface SetInterface {
  "name"?: string;
  "reps": number;
  "distance": number;
  "pace1": number;
  "pace2"?: number;
  "pace3"?: number;
  "pace4"?: number;
  "pace5"?: number;
  "rest": number;
  "big_rest": number;
  "tbs"?: number;
  "order"?: number;
  "id"?: number;
  "workoutId"?: number;
  workout?: Workout;
}

export class Set implements SetInterface {
  "name": string;
  "reps": number;
  "distance": number;
  "pace1": number;
  "pace2": number;
  "pace3": number;
  "pace4": number;
  "pace5": number;
  "rest": number;
  "big_rest": number;
  "invterval": number;
  "tbs": number;
  "order": number;
  "id": number;
  "workoutId": number;
  workout: Workout;
  constructor(data?: SetInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Set`.
   */
  public static getModelName() {
    return "Set";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Set for dynamic purposes.
  **/
  public static factory(data: SetInterface): Set{
    return new Set(data);
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
      name: 'Set',
      plural: 'Sets',
      path: 'Sets',
      idName: 'id',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "reps": {
          name: 'reps',
          type: 'number'
        },
        "distance": {
          name: 'distance',
          type: 'number'
        },
        "pace1": {
          name: 'pace1',
          type: 'number'
        },
        "pace2": {
          name: 'pace2',
          type: 'number'
        },
        "pace3": {
          name: 'pace3',
          type: 'number'
        },
        "pace4": {
          name: 'pace4',
          type: 'number'
        },
        "pace5": {
          name: 'pace5',
          type: 'number'
        },
        "rest": {
          name: 'rest',
          type: 'number'
        },
        "big_rest": {
          name: 'big_rest',
          type: 'number'
        },
        "tbs": {
          name: 'tbs',
          type: 'number'
        },
        "interval": {
          name: 'interval',
          type: 'number'
        },
        "order": {
          name: 'order',
          type: 'number'
        },
        "id": {
          name: 'id',
          type: 'number'
        },
        "workoutId": {
          name: 'workoutId',
          type: 'number'
        },
      },
      relations: {
        workout: {
          name: 'workout',
          type: 'Workout',
          model: 'Workout',
          relationType: 'belongsTo',
                  keyFrom: 'workoutId',
          keyTo: 'id'
        },
      }
    }
  }
}
