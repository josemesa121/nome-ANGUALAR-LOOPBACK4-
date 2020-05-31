/* tslint:disable */
import { Injectable } from '@angular/core';
import { Workout } from '../../models/Workout';
import { Set } from '../../models/Set';
import { Account } from '../../models/Account';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    Workout: Workout,
    Set: Set,
    Account: Account,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
